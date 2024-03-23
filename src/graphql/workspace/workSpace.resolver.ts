import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WorkSpace } from './workSpace.schema';
import { WorkSpaceMember } from '../workSpaceMember/workSpaceMember.schema';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';
import { WorkSpaceService } from './workSpace.service';
import { WorkSpaceMemberService } from '../workSpaceMember/workSpaceMember.service';

@Resolver(() => WorkSpace)
export class WorkSpaceResolver {
  constructor(
    private readonly workSpaceService: WorkSpaceService,
    private readonly workSpaceMemberService: WorkSpaceMemberService,
  ) {}

  @Query(() => WorkSpace, { nullable: true })
  async workSpaceQuery(@CurrentUser() user: User) {
    return user;
  }

  @ResolveField(() => [WorkSpaceMember], { nullable: true })
  async members(@Args('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }

    const members = await this.workSpaceMemberService.findAllMembers(id);

    return members;
  }
}
