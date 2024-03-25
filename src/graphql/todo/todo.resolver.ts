import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { TodoService } from './todo.service';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';

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
}
