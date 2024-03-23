import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoCategory, TodoCategorySchema } from './todoCategory.schema';
import { TodoCategoryResolver } from './todoCategory.resolver';
import { TodoCategoryMutationResolver } from './todoCategory.mutation.resolver';
import { TodoCategoryService } from './todoCategory.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [TodoCategoryService, MongooseModule],
})
export class TodoCategoryModule {}
