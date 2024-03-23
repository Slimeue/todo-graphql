import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSpaceRoom, WorkSpaceRoomSchema } from './workSpaceRoom.schema';
import { WorkSpaceRoomService } from './workSpaceRoom.service';
import { WorkSpaceRoomResolver } from './workSpaceRoom.resolver';
import { WorkSpaceRoomMutationResolver } from './wokrSpaceRoom.mutation.resolver';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles.guard';
import { UsersModule } from '../users/users.module';
import { WorkSpaceMemberModule } from '../workSpaceMember/workSpaceMember.module';

@Module({
  imports: [
    forwardRef(() => WorkSpaceMemberModule),
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: WorkSpaceRoom.name,
        schema: WorkSpaceRoomSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    WorkSpaceRoomService,
    WorkSpaceRoomResolver,
    WorkSpaceRoomMutationResolver,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [],
})
export class WorkSpaceRoomModule {}
