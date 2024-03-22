import { forwardRef, Module } from '@nestjs/common';
import { WorkSpaceMutationResolver } from './workSpace.mutation.resolver';
import { WorkSpaceResolver } from './workSpace.resolver';
import { WorkSpaceService } from './workSpace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSpace, WorkSpaceSchema } from './workSpace.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      { name: WorkSpace.name, schema: WorkSpaceSchema },
    ]),
  ],
  controllers: [],
  providers: [WorkSpaceMutationResolver, WorkSpaceResolver, WorkSpaceService],
  exports: [WorkSpaceService],
})
export class WorkSpaceModule {}
