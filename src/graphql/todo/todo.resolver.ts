import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { Public } from 'src/utils/public.decorators';
import { TodoService } from './todo.service';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';
import { TodoPaginationInput } from 'src/common.types';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Public()
  @ResolveField(() => [Todo], { nullable: 'itemsAndList' })
  async getTodos() {
    const todos = await this.todoService.findAll();
    return todos;
  }
}
