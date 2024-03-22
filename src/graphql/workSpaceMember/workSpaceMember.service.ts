import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSpaceMember } from './workSpaceMember.schema';
import { Model } from 'mongoose';
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
}
