import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './User.schema';
import { UserSetting } from './UserSettings.schema';
import { GetUserArgs } from '../dto/getUser.args';
import { CreateUserArgs } from '../dto/create-user.input';
import { UserService } from './user.service';
import { Public } from 'src/utils/public.decorators';
import { Todo } from '../todo/todo.schema';
import { TodoService } from '../todo/todo.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private todoService: TodoService,
  ) {}

  @Query((returns) => User, { nullable: true, description: 'Get user by id' })
  getUserById(@Args() args: GetUserArgs) {
    return this.userService.findOne(args);
  }

  @Public()
  @Query(() => [User], { description: 'Get all users' })
  getAllUsers() {
    return this.userService.findAll();
  }

  @ResolveField(() => UserSetting, { nullable: true })
  async settings(@Parent() user: User) {
    return console.log('user', user);
  }

  @ResolveField(() => [Todo], { nullable: true })
  async todos(@Parent() user: User) {
    return this.todoService.findByUserId(user.id);
  }
}
