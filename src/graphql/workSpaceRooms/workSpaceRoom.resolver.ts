import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WorkSpaceRoom } from './workSpaceRoom.schema';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';
import { Todo } from '../todo/todo.schema';
import { TodoService } from '../todo/todo.service';
import { TodoPaginationInput } from 'src/common.types';
import { TodoSearch } from '../todo/todo.type';

@Resolver(() => WorkSpaceRoom)
export class WorkSpaceRoomResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => WorkSpaceRoom, { nullable: true })
  async workSpaceRoomQuery(@CurrentUser() user: User) {
    return user;
  }

  @ResolveField(() => TodoSearch, { nullable: true })
  async spaceRoomTodos(@Args('input') input: TodoPaginationInput) {
    const { workspaceRoomId } = input;

    if (!workspaceRoomId) {
      throw new Error('workspaceRoomId is required');
    }

    const todos = await this.todoService.search({
      ...input,
      page: input?.page ? input?.page : 1,
      limit: input?.limit ? input?.limit : 10,
    });

    return todos;
  }
}
