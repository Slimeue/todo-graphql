import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/graphql/users/User.schema';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext()?.req?.user;
    console.log('user', user.user);
    if (user) {
      if (data) {
        return user.user[data];
      }
      return user.user;
    } else {
      return null;
    }
  },
);
