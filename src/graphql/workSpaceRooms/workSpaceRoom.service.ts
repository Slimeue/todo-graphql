import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSpaceRoom } from './workSpaceRoom.schema';
import { Model } from 'mongoose';
import { WorkSpaceRoomCreateInput } from './workSpaceRoom.types';
import {
  WorkSpaceMember,
  WorkSpaceMemberDocument,
} from '../workSpaceMember/workSpaceMember.schema';
import { Role } from 'src/common.types';

@Injectable()
export class WorkSpaceRoomService {
  constructor(
    @InjectModel(WorkSpaceRoom.name)
    private workSpaceRoomModel: Model<WorkSpaceRoom>,
    @InjectModel(WorkSpaceMember.name)
    private workSpaceMemberRepo: Model<WorkSpaceMemberDocument>,
  ) {}

  async create(userId: string, input: WorkSpaceRoomCreateInput) {
    const { workspaceId } = input;

    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const isMember = await this.workSpaceMemberRepo.findOne({
      memberId: userId,
      workSpaceId: workspaceId,
    });

    if (!isMember) {
      throw new UnauthorizedException('User is not a member of the workspace');
    }

    if (
      !isMember.roles.includes(Role.ADMIN) &&
      !isMember.roles.includes(Role.OWNER)
    ) {
      throw new Error('User is not an admin or owner of the workspace');
    }

    const newWorkSpaceRoom = await new this.workSpaceRoomModel({
      ...input,
    });

    console.log('newWorkSpaceRoom', newWorkSpaceRoom);

    return newWorkSpaceRoom.save();
  }
}
