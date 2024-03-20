import { Resolver } from '@nestjs/graphql';
import { TodoCategory } from './todoCategory.schema';
import { TodoCategoryService } from './todoCategory.service';

@Resolver(() => TodoCategory)
export class TodoCategoryResolver {
  constructor(private readonly todoCategoryService: TodoCategoryService) {}
}
