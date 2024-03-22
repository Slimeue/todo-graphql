import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TodoCategory } from './todoCategory.schema';
import { TodoCategoryService } from './todoCategory.service';
import { TodoCategorySearch } from './todoCategory.types';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';
import { TodoCategoryPaginationInput } from 'src/common.types';

@Resolver(() => TodoCategory)
export class TodoCategoryResolver {
  constructor(private readonly todoCategoryService: TodoCategoryService) {}

  @Query(() => TodoCategory, { nullable: true })
  async todoCategoryQuery(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @ResolveField(() => TodoCategorySearch, { nullable: true })
  async getTodoCategories(
    @CurrentUser() currentUser: User,
    @Args('input', { type: () => TodoCategoryPaginationInput })
    input: TodoCategoryPaginationInput,
  ) {
    const userId = currentUser.id;

    const categories = await this.todoCategoryService.search({
      userId,
      ...input,
    });

    console.log('categories', categories);

    return categories;
  }

  @ResolveField(() => TodoCategory, { nullable: true })
  async getTodoCategory(@Args('id') id: string) {
    if (!id) {
      throw new Error('Id is required');
    }

    const category = await this.todoCategoryService.find(id);
    return category;
  }
}
