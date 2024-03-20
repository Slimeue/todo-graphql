import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User.schema';
import { UserSetting, UserSettingSchema } from './UserSettings.schema';
import { UserResolver } from './User.resolver';
import { UserSettingResolver } from './UserSettings.resolver';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { UserMutationResolver } from './user.mutation.resolver';
import { TodoModule } from '../todo/todo.module';
import { AppModule } from 'src/app.module';
import { RolesGuard } from 'src/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthMiddleware } from '../auth/auth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/config';

@Module({
  controllers: [UsersController],
  imports: [
    forwardRef(() => TodoModule),
    forwardRef(() => AppModule),
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
    JwtModule.register({
      secret: SECRET_KEY,
    }),
  ],
  providers: [
    UserResolver,
    UserSettingResolver,
    UserService,
    UserMutationResolver,
    User,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [UserService, User, MongooseModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
