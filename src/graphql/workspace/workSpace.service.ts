import { Injectable } from '@nestjs/common';
import { WorkSpaceCreateInput, WorkSpaceUpdateInput } from './workSpace.types';
import { InjectModel } from '@nestjs/mongoose';
import { WorkSpace } from './workSpace.schema';
import { Model } from 'mongoose';
import { UserService } from '../users/user.service';
import { User, UserDocument } from '../users/user.schema';
import { Role } from 'src/common.types';

@Injectable()
export class WorkSpaceService {
  constructor(
    @InjectModel(WorkSpace.name)
    private readonly workSpaceModel: Model<WorkSpace>,
    private readonly userService: UserService,
    @InjectModel(User.name)
    private readonly userModel: UserDocument,
  ) {}

  async create(id: string, input: WorkSpaceCreateInput) {
    if (!id) {
      throw new Error('Owner ID is required');
    }

    const user = await this.userService.findOneById({ id });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.roles.includes(Role.OWNER)) {
      await this.userModel.updateOne(
        { id: user.id },
        { $push: { roles: Role.OWNER } },
      );
    }

    const createdWorkSpace = await new this.workSpaceModel({
      ownerId: id,
      ...input,
    });

    return createdWorkSpace.save();
  }

  async update(input: WorkSpaceUpdateInput) {
    const { id } = input;

    if (!id) {
      throw new Error('ID is required');
    }

    const workSpace = await this.workSpaceModel.findOneAndUpdate(
      { id },
      { $set: { name: input?.name, description: input?.description } },
    );

    return workSpace;
  }

  async findAllByUserId(userId: string) {
    return this.workSpaceModel.find({ ownerId: userId });
  }

}
