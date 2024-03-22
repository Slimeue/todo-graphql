import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.schema';
import { GetUserArgs } from '../dto/getUser.args';
import { UserService } from './user.service';
import { Public } from 'src/utils/public.decorators';
import { Todo } from '../todo/todo.schema';
import { TodoService } from '../todo/todo.service';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { Role, TodoPaginationInput } from 'src/common.types';
import { Roles } from 'src/roles.decorator';
import { TodoSearch } from '../todo/todo.type';

import { TodoCategoryService } from '../todoCategory/todoCategory.service';
import { WorkSpace } from '../workspace/workSpace.schema';
import { WorkSpaceService } from '../workspace/workSpace.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private workSpaceService: WorkSpaceService,
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

  @ResolveField(() => [WorkSpace], { nullable: true })
  async ownedWorkSpaces(@CurrentUser() user: User) {
    const { id } = user;

    const workSpaces = await this.workSpaceService.findAllByUserId(id);

    return workSpaces;
  }

  //TODO workspaces that user is a member/admin/owner

}
