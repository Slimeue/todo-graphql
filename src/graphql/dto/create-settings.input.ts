import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSettingsInput {
  @Field((type) => Int)
  userId: number;

  @Field({ nullable: true, defaultValue: false })
  recieveNotifcations: boolean;

  @Field({ nullable: true, defaultValue: false })
  recieveEmails: boolean;
}
