import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { Public } from 'src/utils/public.decorators';
import { todoCreateInput } from './todo.type';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoMutationResolver {
  constructor(private todoService: TodoService) {}

  @Public()
  @Mutation(() => Todo)
  createTodo(
    @Args('input', { type: () => todoCreateInput }) input: todoCreateInput,
  ) {
    return this.todoService.create(input);
  }
}
