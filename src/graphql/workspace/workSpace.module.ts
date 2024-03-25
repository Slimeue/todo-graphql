import { forwardRef, Module } from '@nestjs/common';
import { WorkSpaceMutationResolver } from './workSpace.mutation.resolver';
import { WorkSpaceResolver } from './workSpace.resolver';
import { WorkSpaceService } from './workSpace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSpace, WorkSpaceSchema } from './workSpace.schema';
import { UsersModule } from '../users/users.module';
import { WorkSpaceMemberModule } from '../workSpaceMember/workSpaceMember.module';
import { WorkSpaceRoomModule } from '../workSpaceRooms/workSpaceRoom.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => WorkSpaceMemberModule),
    forwardRef(() => WorkSpaceRoomModule),
    MongooseModule.forFeature([
      { name: WorkSpace.name, schema: WorkSpaceSchema },
    ]),
  ],
  controllers: [],
  providers: [WorkSpaceMutationResolver, WorkSpaceResolver, WorkSpaceService],
  exports: [WorkSpaceService],
})
export class WorkSpaceModule {}
