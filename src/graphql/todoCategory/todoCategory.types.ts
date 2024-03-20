import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Meta } from 'src/common.types';
import { TodoCategory } from './todoCategory.schema';

@InputType()
export class TodoCategoryCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@InputType()
export class TodoCategoryUpdateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@ObjectType('TodoCategorySearch')
export class TodoCategorySearch {
  @Field(() => [TodoCategory], { nullable: true })
  items: TodoCategory[];

  @Field()
  meta: Meta;
}
