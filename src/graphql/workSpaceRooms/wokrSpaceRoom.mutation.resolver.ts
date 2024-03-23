import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WorkSpaceRoom } from './workSpaceRoom.schema';
import { WorkSpaceRoomService } from './workSpaceRoom.service';
import { WorkSpaceRoomCreateInput } from './workSpaceRoom.types';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/common.types';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';

@Resolver(() => WorkSpaceRoom)
export class WorkSpaceRoomMutationResolver {
  constructor(private readonly workSpaceRoomService: WorkSpaceRoomService) {}

  @Roles(Role.OWNER, Role.ADMIN)
  @Mutation(() => WorkSpaceRoom)
  async createWorkSpaceRoom(
    @Args('input') input: WorkSpaceRoomCreateInput,
    @CurrentUser() user: User,
  ) {
    const { workspaceId } = input;
    const { id: userId } = user;

    if (!userId) {
      throw new Error('userId is required');
    }

    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const newWorkSpaceRoom = await this.workSpaceRoomService.create(
      userId,
      input,
    );

    return newWorkSpaceRoom;
  }
}
