import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User.schema';
import { UserSetting, UserSettingSchema } from './UserSettings.schema';
import { UserResolver } from './User.resolver';
import { UserSettingResolver } from './UserSettings.resolver';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserMutationResolver } from './user.mutation.resolver';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSetting.name,
        schema: UserSettingSchema,
      },
    ]),
  ],
  providers: [
    UserResolver,
    UserSettingResolver,
    UserService,
    UserMutationResolver,
    User,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [UserService, User],
})
export class UsersModule {}
