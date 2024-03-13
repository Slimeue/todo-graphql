import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { Public } from 'src/utils/public.decorators';
import { todoCreateInput, todoUpdateInput } from './todo.type';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoMutationResolver {
  constructor(private todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(
    @Args('input', { type: () => todoCreateInput }) input: todoCreateInput,
  ) {
    return this.todoService.create(input);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('input', { type: () => todoUpdateInput }) input: todoUpdateInput,
  ) {
    return this.todoService.update(input);
  }

  @Mutation(() => Todo)
  deleteTodo(@Args('id', { type: () => String }) id: string) {
    return this.todoService.delete(id);
  }
}
