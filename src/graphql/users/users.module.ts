import {
  MiddlewareConsumer,
  Module,
  NestModule,
  forwardRef,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { UserMutationResolver } from './user.mutation.resolver';
import { TodoModule } from '../todo/todo.module';
import { AppModule } from 'src/app.module';
import { RolesGuard } from 'src/roles.guard';

import { AuthMiddleware } from '../auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/config';
import { TodoCategoryModule } from '../todoCategory/todoCategory.module';
import { WorkSpaceModule } from '../workspace/workSpace.module';

@Module({
  controllers: [UsersController],
  imports: [
    forwardRef(() => TodoModule),
    forwardRef(() => AppModule),
    forwardRef(() => TodoCategoryModule),
    forwardRef(() => WorkSpaceModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: SECRET_KEY,
    }),
  ],
  providers: [
    UserResolver,
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
