import { ArgsType, Field, ID, Int } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field(() => ID, { description: 'User id' })
  id: string;

  @Field()
  username: string;
}
