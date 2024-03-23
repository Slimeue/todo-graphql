import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WorkSpace } from './workSpace.schema';
import { WorkSpaceService } from './workSpace.service';
import { WorkSpaceCreateInput, WorkSpaceUpdateInput } from './workSpace.types';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';
import { WorkSpaceMemberService } from '../workSpaceMember/workSpaceMember.service';

@Resolver(() => WorkSpace)
export class WorkSpaceMutationResolver {
  constructor(
    private readonly workSpaceService: WorkSpaceService,
    private readonly workSpaceMemberService: WorkSpaceMemberService,
  ) {}

  @Mutation(() => WorkSpace)
  async createWorkSpace(
    @Args('input', { type: () => WorkSpaceCreateInput })
    input: WorkSpaceCreateInput,
    @CurrentUser() user: User,
  ) {
    const { id, email } = user;

    const workSpace = await this.workSpaceService.create(id, input);

    const { ownerId } = workSpace;

    const workSpaceId = workSpace.id;

    if (!ownerId) {
      throw new Error('Owner ID not found');
    }

    if (!workSpaceId) {
      throw new Error('WorkSpace ID not found');
    }

    const createdOwnerMember = await this.workSpaceMemberService.createOwner(
      ownerId,
      email,
      {
        workSpaceId,
      },
    );

    return workSpace;
  }

  @Mutation(() => WorkSpace)
  async updateWorkSpace(
    @Args('input', { type: () => WorkSpaceUpdateInput })
    input: WorkSpaceUpdateInput,
  ) {
    const { id } = input;

    if (!id) {
      throw new Error('ID is required');
    }

    const workSpace = await this.workSpaceService.update(input);

    if (!workSpace) {
      throw new Error('WorkSpace not found');
    }

    return workSpace;
  }
}
