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
import {
  Role,
  TodoCategoryPaginationInput,
  TodoPaginationInput,
} from 'src/common.types';
import { Roles } from 'src/roles.decorator';
import { TodoSearch } from '../todo/todo.type';
import { TodoCategory } from '../todoCategory/todoCategory.schema';
import { TodoCategoryService } from '../todoCategory/todoCategory.service';
import { TodoCategorySearch } from '../todoCategory/todoCategory.types';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private todoService: TodoService,
    private todoCategoryService: TodoCategoryService,
  ) {}

  @Query(() => User)
  async viewer(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Roles(Role.ADMIN)
  @ResolveField(() => User, { nullable: true })
  getUserById(@Args() args: GetUserArgs) {
    return this.userService.findOne(args);
  }

  @Public()
  @ResolveField(() => [User], { nullable: true })
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

  @ResolveField(() => TodoSearch, { nullable: true })
  async getTodosByUserId(
    @Parent() user: User,
    @CurrentUser() currentUser: User,
    @Args('input', { type: () => TodoPaginationInput })
    input: TodoPaginationInput,
  ) {
    const todos = await this.todoService.search({
      ...input,
      userId: currentUser.id,
    });
    console.log('todos', todos);
    return todos;
  }

  @ResolveField(() => TodoCategorySearch, { nullable: true })
  async getTodoCategories(
    @CurrentUser() currentUser: User,
    @Args('input', { type: () => TodoCategoryPaginationInput })
    input: TodoCategoryPaginationInput,
  ) {
    const userId = currentUser.id;

    const categories = await this.todoCategoryService.search({
      userId,
      ...input,
    });

    console.log('categories', categories);

    return categories;
  }

  @ResolveField(() => TodoCategory, { nullable: true })
  async getTodoCategory(@Args('id') id: string) {
    if (!id) {
      throw new Error('Id is required');
    }

    const category = await this.todoCategoryService.find(id);
    return category;
  }
}
