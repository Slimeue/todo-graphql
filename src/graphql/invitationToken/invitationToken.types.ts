import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InvitationTokenCreateInput {
  @Field()
  workspaceId: string;
}
