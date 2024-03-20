import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Todo } from './todo.schema';
import { Meta } from 'src/common.types';

@InputType()
export class todoCreateInput {
  @Field(() => ID)
  userId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  status: string;

  @Field()
  priority: string;

  @Field(() => ID, { nullable: true })
  categoryId?: string;
}

@InputType()
export class todoUpdateInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  priority: string;

  @Field(() => ID, { nullable: true })
  categoryId?: string;
}

@ObjectType('TodoSearch')
export class TodoSearch {
  @Field(() => [Todo], { nullable: true })
  items: Todo[];

  @Field()
  meta: Meta;
}
