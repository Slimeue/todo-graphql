import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TodoCategory } from './todoCategory.schema';
import { TodoCategoryService } from './todoCategory.service';
import {
  TodoCategoryCreateInput,
  TodoCategoryUpdateInput,
} from './todoCategory.types';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';

@Resolver((of) => TodoCategory)
export class TodoCategoryMutationResolver {
  constructor(private readonly todoCategoryService: TodoCategoryService) {}

  @Mutation(() => TodoCategory)
  async createTodoCategory(
    @Args('input', { type: () => TodoCategoryCreateInput })
    input: TodoCategoryCreateInput,
    @CurrentUser() user: User,
  ) {
    if (!user) {
      throw new Error('No user found');
    }

    if (!input) {
      throw new Error('No input provided');
    }

    const { id } = user;

    const category = this.todoCategoryService.create(id, input);

    if (!category) {
      throw new Error('Failed to create category');
    }

    return category;
  }

  @Mutation(() => TodoCategory)
  async updateTodoCategory(
    @Args('input', { type: () => TodoCategoryUpdateInput })
    input: TodoCategoryUpdateInput,
  ) {
    if (!input) {
      throw new Error('No input provided');
    }

    const updatedTodoCategory = this.todoCategoryService.update(input);

    if (!updatedTodoCategory) {
      throw new Error('Failed to update category');
    }

    return updatedTodoCategory;
  }
}
