import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserArgs {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  displayName?: string;
}
