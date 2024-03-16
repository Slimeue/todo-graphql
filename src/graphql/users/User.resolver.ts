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
import { CurrentUser } from '../auth/decorator/currentUser.decorator';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private todoService: TodoService,
  ) {}

  @Query(() => User)
  async viewer(@CurrentUser() user: User): Promise<User> {
    console.log('user', user.displayName);
    return user;
  }

  @ResolveField(() => User, { nullable: true })
  getUserById(@Args() args: GetUserArgs) {
    return this.userService.findOne(args);
  }

  @Public()
  @ResolveField(() => [User])
  getAllUsers() {
    return this.userService.findAll();
  }

  // @ResolveField(() =>[Todo])
  // async todos
  @ResolveField(() => Todo, { nullable: true })
  async getTodo(@Args('id') id: string, @CurrentUser() user: User) {
    const todo = await this.todoService.findOne(id);

    if (todo.userId !== user.id) {
      throw new Error('Not authorized');
    }

    return todo;
  }

  @ResolveField(() => [Todo], { nullable: true })
  async todos(@CurrentUser() user: User) {
    return this.todoService.findByUserId(user.id);
  }
}
