import { Module, forwardRef } from '@nestjs/common';
import { Todo, TodoSchema } from './todo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { TodoMutationResolver } from './todo.mutation.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
  ],
  providers: [TodoResolver, TodoService, TodoMutationResolver],
  exports: [TodoService],
})
export class TodoModule {}
