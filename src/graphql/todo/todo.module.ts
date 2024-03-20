import { Module, forwardRef } from '@nestjs/common';
import { Todo, TodoSchema } from './todo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { TodoMutationResolver } from './todo.mutation.resolver';
import { UsersModule } from '../users/users.module';
import { TodoCategoryModule } from '../todoCategory/todoCategory.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => TodoCategoryModule),
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
