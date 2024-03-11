import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './graphql/users/users.module';
import { TodoModule } from './graphql/todo/todo.module';
import { AuthModule } from './graphql/auth/auth.module';
import { JwtStrategy } from './graphql/auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
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
  ],
})
export class AppModule {}