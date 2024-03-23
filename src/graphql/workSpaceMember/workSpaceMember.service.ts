import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSpaceMember } from './workSpaceMember.schema';
import { Model, PipelineStage } from 'mongoose';
import { WorkSpaceMemberCreateInput } from './workSpaceMember.types';

@Injectable()
export class WorkSpaceMemberService {
  constructor(
    @InjectModel(WorkSpaceMember.name)
    private workSpaceMemberModel: Model<WorkSpaceMember>,
  ) {}

  async create(id: string, input: WorkSpaceMemberCreateInput) {
    const { workspaceId } = input;

    if (!id) {
      throw new Error('id is required');
    }

    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const newWorkSpaceMember = await new this.workSpaceMemberModel({
      memberId: id,
      workSpaceId: workspaceId,
    });

    console.log('newWorkSpaceMember', newWorkSpaceMember);

    return newWorkSpaceMember.save();
  }

  async findAllMembers(workspaceId: string) {
    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    return this.workSpaceMemberModel.find({ workSpaceId: workspaceId });
  }

  async findWorkspaceByMemberId(memberId: string) {
    if (!memberId) {
      throw new Error('memberId is required');
    }

    const aggregate: PipelineStage[] = [];

    const match: PipelineStage.Match = {
      $match: {
        memberId,
      },
    };

    aggregate.push(match);

    const lookup: PipelineStage.Lookup = {
      $lookup: {
        from: 'workspaces',
        localField: 'workSpaceId',
        foreignField: 'id',
        as: 'workSpace',
      },
    };

    aggregate.push(lookup);

    aggregate.push({
      $unwind: '$workSpace',
    });

    aggregate.push({
      $group: {
        _id: null,
        workSpace: { $push: '$workSpace' },
      },
    });

    aggregate.push({
      $project: {
        _id: 0,
        workSpace: 1,
      },
    });

    const result = await this.workSpaceMemberModel.aggregate(aggregate).exec();

    const workSpace = result[0]?.workSpace;

    if (!workSpace) {
      return null;
    }

    return workSpace;
  }
}
