import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './graphql/users/users.module';
import { TodoModule } from './graphql/todo/todo.module';
import { AuthModule } from './graphql/auth/auth.module';
import { JwtStrategy } from './graphql/auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MONGO_URL } from './config';
import { CommonService } from './common.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRoot(MONGO_URL),
    UsersModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtStrategy,
    },
    CommonService,
  ],
  exports: [CommonService],
})
export class AppModule {}
