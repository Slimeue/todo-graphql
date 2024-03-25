import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Meta } from 'src/common.types';
import { WorkSpaceRoom } from './workSpaceRoom.schema';

@InputType()
export class WorkSpaceRoomCreateInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  workspaceId: string;
}

@ObjectType('WorkSpaceRoomSearch')
export class WorkSpaceRoomSearch {
  @Field(() => [WorkSpaceRoom])
  items: WorkSpaceRoom[];

  @Field()
  meta: Meta;
}
