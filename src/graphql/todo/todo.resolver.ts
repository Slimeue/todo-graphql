import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { Public } from 'src/utils/public.decorators';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Public()
  @Query(() => [Todo], { nullable: 'itemsAndList' })
  async getTodos() {
    const todos = await this.todoService.findAll();
    return todos;
  }
}
