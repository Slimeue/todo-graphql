import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class todoCreateInput {
  @Field(() => ID)
  userId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  priority: string;
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
}
