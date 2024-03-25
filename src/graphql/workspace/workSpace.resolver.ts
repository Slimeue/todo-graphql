import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WorkSpace } from './workSpace.schema';
import { WorkSpaceMember } from '../workSpaceMember/workSpaceMember.schema';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';
import { WorkSpaceService } from './workSpace.service';
import { WorkSpaceMemberService } from '../workSpaceMember/workSpaceMember.service';
import { WorkSpaceRoom } from '../workSpaceRooms/workSpaceRoom.schema';
import { WorkspaceRoomPaginationInput } from 'src/common.types';
import { WorkSpaceRoomService } from '../workSpaceRooms/workSpaceRoom.service';
import { WorkSpaceRoomSearch } from '../workSpaceRooms/workSpaceRoom.types';

@Resolver(() => WorkSpace)
export class WorkSpaceResolver {
  constructor(
    private readonly workSpaceService: WorkSpaceService,
    private readonly workSpaceMemberService: WorkSpaceMemberService,
    private readonly workSpaceRoomService: WorkSpaceRoomService,
  ) {}

  @Query(() => WorkSpace, { nullable: true })
  async workSpaceQuery(@CurrentUser() user: User) {
    return user;
  }

  @ResolveField(() => [WorkSpaceMember], { nullable: true })
  async members(@Args('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }

    const members = await this.workSpaceMemberService.findAllMembers(id);

    return members;
  }

  @ResolveField(() => WorkSpaceRoomSearch, { nullable: true })
  async workspaceRooms(@Args('input') input: WorkspaceRoomPaginationInput) {
    const { workspaceId } = input;

    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const rooms = await this.workSpaceRoomService.search({
      ...input,
      page: input?.page ? input?.page : 1,
      limit: input?.limit ? input?.limit : 10,
    });

    return rooms;
  }
}
