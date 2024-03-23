import { Resolver } from '@nestjs/graphql';
import { WorkSpaceRoom } from './workSpaceRoom.schema';

@Resolver(() => WorkSpaceRoom)
export class WorkSpaceRoomResolver {
  constructor() {}
}
