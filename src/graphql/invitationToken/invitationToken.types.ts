import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InvitationTokenCreateInput {
  @Field()
  email: string;
  @Field()
  workspaceId: string;
}
