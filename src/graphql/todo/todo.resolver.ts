import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { Public } from 'src/utils/public.decorators';
import { TodoService } from './todo.service';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';
import { TodoPaginationInput } from 'src/common.types';
import { TodoSearch } from './todo.type';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => Todo, { nullable: true })
  async todoQuery(@CurrentUser() user: User) {
    return user;
  }

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
    return todos;
  }
}
