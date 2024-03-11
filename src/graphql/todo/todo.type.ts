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
