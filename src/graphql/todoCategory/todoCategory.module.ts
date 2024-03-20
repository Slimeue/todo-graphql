import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoCategory, TodoCategorySchema } from './todoCategory.schema';
import { TodoCategoryResolver } from './todoCategory.resolver';
import { TodoCategoryMutationResolver } from './todoCategory.mutation.resolver';
import { TodoCategoryService } from './todoCategory.service';
import { TodoModule } from '../todo/todo.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TodoCategory.name,
        schema: TodoCategorySchema,
      },
    ]),
  ],
  providers: [
    TodoCategoryResolver,
    TodoCategoryMutationResolver,
    TodoCategoryService,
  ],
  exports: [TodoCategoryService, MongooseModule],
})
export class TodoCategoryModule {}
