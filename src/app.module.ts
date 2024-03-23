import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './graphql/users/users.module';
import { TodoModule } from './graphql/todo/todo.module';
import { AuthModule } from './graphql/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MONGO_URL } from './config';
import { CommonService } from './common.service';
import { JwtAuthGuard } from './graphql/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { WorkSpaceModule } from './graphql/workspace/workSpace.module';
import { WorkSpaceMemberModule } from './graphql/workSpaceMember/workSpaceMember.module';
import { InvitationTokenModule } from './graphql/invitationToken/invitationToken.module';
import { WorkSpaceRoomModule } from './graphql/workSpaceRooms/workSpaceRoom.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      fieldResolverEnhancers: ['guards'],
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot(MONGO_URL),
    TodoModule,
    AuthModule,
    UsersModule,
    WorkSpaceModule,
    WorkSpaceMemberModule,
    InvitationTokenModule,
    WorkSpaceRoomModule,
  ],
  controllers: [],
  providers: [CommonService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [CommonService],
})
export class AppModule {}
