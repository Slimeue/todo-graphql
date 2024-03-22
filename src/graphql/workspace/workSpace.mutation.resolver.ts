import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WorkSpace } from './workSpace.schema';
import { WorkSpaceService } from './workSpace.service';
import { WorkSpaceCreateInput, WorkSpaceUpdateInput } from './workSpace.types';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';

@Resolver(() => WorkSpace)
export class WorkSpaceMutationResolver {
  constructor(private readonly workSpaceService: WorkSpaceService) {}

  @Mutation(() => WorkSpace)
  async createWorkSpace(
    @Args('input', { type: () => WorkSpaceCreateInput })
    input: WorkSpaceCreateInput,
    @CurrentUser() user: User,
  ) {
    const { id } = user;

    return this.workSpaceService.create(id, input);
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
