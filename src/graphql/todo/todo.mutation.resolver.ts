import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { Public } from 'src/utils/public.decorators';
import { todoCreateInput, todoUpdateInput } from './todo.type';
import { TodoService } from './todo.service';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/common.types';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';

@Resolver((of) => Todo)
export class TodoMutationResolver {
  constructor(private todoService: TodoService) {}

  @Roles(Role.ADMIN, Role.USER)
  @Mutation(() => Todo)
  createTodo(
    @Args('input', { type: () => todoCreateInput }) input: todoCreateInput,
    @CurrentUser() user: User,
  ) {
    const { id } = user;

    return this.todoService.create(id, input);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Mutation(() => Todo)
  updateTodo(
    @Args('input', { type: () => todoUpdateInput }) input: todoUpdateInput,
  ) {
    return this.todoService.update(input);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Mutation(() => Todo)
  deleteTodo(@Args('id', { type: () => String }) id: string) {
    return this.todoService.delete(id);
  }
}
