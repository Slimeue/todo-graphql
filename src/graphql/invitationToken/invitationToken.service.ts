import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InvitationToken } from './invitationToken.schema';
import { Model } from 'mongoose';
import { InvitationTokenCreateInput } from './invitationToken.types';
import { makeToken } from 'src/helper';

@Injectable()
export class InvitationTokenService {
  constructor(
    @InjectModel(InvitationToken.name)
    private invitationTokenModel: Model<InvitationToken>,
  ) {}

  async create(id: string, input: InvitationTokenCreateInput) {
    let token = '';

    if (!id) {
      throw new Error('userId is required');
    }

    do {
      token = makeToken(12);
    } while (await this.invitationTokenModel.findOne({ token: token }));

    const newInvitationToken = await new this.invitationTokenModel({
      userId: id,
      email: input.email,
      workspaceId: input.workspaceId,
      token: token,
    });

    return newInvitationToken.save();
  }

  async findOne(token: string) {
    return this.invitationTokenModel.findOne({ token });
  }
}
