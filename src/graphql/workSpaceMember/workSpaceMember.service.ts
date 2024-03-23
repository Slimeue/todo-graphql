import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSpaceMember } from './workSpaceMember.schema';
import { Model, PipelineStage } from 'mongoose';
import { WorkSpaceMemberCreateInput } from './workSpaceMember.types';
import { Role } from 'src/common.types';
import { UserService } from '../users/user.service';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class WorkSpaceMemberService {
  constructor(
    @InjectModel(WorkSpaceMember.name)
    private workSpaceMemberModel: Model<WorkSpaceMember>,
    @InjectModel(User.name)
    private userRepo: Model<UserDocument>,
    private userService: UserService,
  ) {}
  //TODO add validation when creating a member to check if the member is already in the workspace
  async createMember(
    id: string,
    email: string,
    input: WorkSpaceMemberCreateInput,
  ) {
    const { workSpaceId: workspaceId } = input;

    if (!id) {
      throw new Error('id is required');
    }

    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const isExisting = await this.workSpaceMemberModel.findOne({
      memberId: id,
      workSpaceId: workspaceId,
    });

    if (isExisting) {
      throw new Error('Member already exists');
    }

    const user = await this.userService.findOneById({ id });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.roles.includes(Role.MEMBER)) {
      await this.userRepo.updateOne(
        { id: user.id },
        { $push: { roles: Role.MEMBER } },
      );
    }

    const newWorkSpaceMember = await new this.workSpaceMemberModel({
      memberId: id,
      workSpaceId: workspaceId,
      email,
    });

    console.log('newWorkSpaceMember', newWorkSpaceMember);

    return newWorkSpaceMember.save();
  }

  //TODO add validation when creating an owner to check if the owner is already in the workspace
  async createOwner(
    id: string,
    email: string,
    input: WorkSpaceMemberCreateInput,
  ) {
    const { workSpaceId } = input;

    if (!id) {
      throw new Error('id is required');
    }

    if (!workSpaceId) {
      throw new Error('workspaceId is required');
    }

    const newWorkSpaceMember = await new this.workSpaceMemberModel({
      memberId: id,
      workSpaceId,
      email,
      roles: [Role.OWNER],
    });

    return newWorkSpaceMember.save();
  }

  async findAllMembers(workSpaceId: string) {
    if (!workSpaceId) {
      throw new Error('workspaceId is required');
    }

    return this.workSpaceMemberModel.find({ workSpaceId });
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

    console.log('result', result);

    const workSpace = result[0]?.workSpace;

    if (!workSpace) {
      return null;
    }

    return workSpace;
  }
}
