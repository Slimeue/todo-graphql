import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { GetUserArgs } from '../dto/getUser.args';
import { UserService } from './user.service';
import { Public } from 'src/utils/public.decorators';

import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { Role } from 'src/common.types';
import { Roles } from 'src/roles.decorator';

import { WorkSpace } from '../workspace/workSpace.schema';
import { WorkSpaceService } from '../workspace/workSpace.service';
import { WorkSpaceMemberService } from '../workSpaceMember/workSpaceMember.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private workSpaceService: WorkSpaceService,
    private workSpaceMemberService: WorkSpaceMemberService,
  ) {}

  @Query(() => User)
  async userQuery(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Roles(Role.ADMIN, Role.USER)
  @ResolveField(() => User, { nullable: true })
  async getUserById(@Args() args: GetUserArgs) {
    return this.userService.findOne(args);
  }

  @Public()
  @Roles(Role.ADMIN)
  @ResolveField(() => [User], { nullable: true })
  getAllUsers() {
    return this.userService.findAll();
  }

  @ResolveField(() => [WorkSpace], {
    nullable: true,
    description: 'owned workspaces',
  })
  async ownedWorkSpaces(@CurrentUser() user: User) {
    const { id } = user;

    const workSpaces = await this.workSpaceService.findAllByUserId(id);

    return workSpaces;
  }

  @ResolveField(() => [WorkSpace], {
    nullable: true,
    description: 'workspaces that user is a member/admin but not owner',
  })
  async workSpaces(@CurrentUser() user: User) {
    const { id } = user;

    const workSpaces =
      await this.workSpaceMemberService.findWorkspaceByMemberId(id);

    return workSpaces;
  }
}
