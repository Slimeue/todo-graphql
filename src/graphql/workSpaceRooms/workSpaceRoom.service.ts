import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSpaceRoom } from './workSpaceRoom.schema';
import { Model, PipelineStage } from 'mongoose';
import { WorkSpaceRoomCreateInput } from './workSpaceRoom.types';
import {
  WorkSpaceMember,
  WorkSpaceMemberDocument,
} from '../workSpaceMember/workSpaceMember.schema';
import { Role, WorkspaceRoomPaginationInput } from 'src/common.types';

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

  async search(input: WorkspaceRoomPaginationInput) {
    const { limit, page, workspaceId } = input;

    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const aggregate: PipelineStage[] = [];
    const match: PipelineStage.Match = {
      $match: {
        workspaceId,
      },
    };

    aggregate.push(match);

    aggregate.push({
      $facet: {
        meta: [
          {
            $group: {
              _id: null,
              totalDocs: {
                $sum: 1,
              },
            },
          },
          {
            $addFields: {
              page,
              limit,
            },
          },
        ],
        docs: [{ $skip: limit * (page - 1) }, { $limit: limit }],
      },
    });

    const result = await this.workSpaceRoomModel.aggregate(aggregate).exec();

    const meta = result[0].meta[0];
    const items = result[0].docs;

    return { items, meta };
  }
}
