import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/graphql/users/User.schema';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    console.log('ctx.getContext()', ctx.getContext().req.user);

    const user = ctx.getContext()?.req?.user;
    if (user) {
      if (data) {
        return user[data];
      }
      return user;
    } else {
      return null;
    }
  },
);
