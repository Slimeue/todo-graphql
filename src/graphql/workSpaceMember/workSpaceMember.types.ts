import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WorkSpaceMemberCreateInput {
  @Field()
  workspaceId: string;
}
