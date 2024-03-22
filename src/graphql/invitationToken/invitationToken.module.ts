import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InvitationToken,
  InvitationTokenSchema,
} from './invitationToken.schema';
import { InvitationTokenService } from './invitationToken.service';
import { InvitationTokenMutationResolver } from './invitationToken.mutation.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: InvitationToken.name,
        schema: InvitationTokenSchema,
      },
    ]),
  ],
  providers: [InvitationTokenService, InvitationTokenMutationResolver],
  exports: [MongooseModule, InvitationTokenService],
  controllers: [],
})
export class InvitationTokenModule {}
