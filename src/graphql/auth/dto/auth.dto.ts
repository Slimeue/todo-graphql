import { Field } from '@nestjs/graphql';

export class AuthPayloadDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
