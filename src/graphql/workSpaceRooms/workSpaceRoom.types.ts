import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WorkSpaceRoomCreateInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  workspaceId: string;
}
