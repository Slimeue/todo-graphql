import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSpaceMemberResolver } from './workSpaceMember.resolver';
import { WorkSpaceMemberMutationResolver } from './workSpaceMember.mutation.resolver';
import { WorkSpaceMemberService } from './workSpaceMember.service';
import { InvitationTokenModule } from '../invitationToken/invitationToken.module';
import {
  WorkSpaceMember,
  WorkSpaceMemberSchema,
} from './workSpaceMember.schema';

@Module({
  imports: [
    forwardRef(() => InvitationTokenModule),
    MongooseModule.forFeature([
      {
        name: WorkSpaceMember.name,
        schema: WorkSpaceMemberSchema,
      },
    ]),
  ],
  providers: [
    WorkSpaceMemberResolver,
    WorkSpaceMemberMutationResolver,
    WorkSpaceMemberService,
  ],
  exports: [WorkSpaceMemberService, MongooseModule],
  controllers: [],
})
export class WorkSpaceMemberModule {}
