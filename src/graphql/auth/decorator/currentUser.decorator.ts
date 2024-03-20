import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/graphql/users/user.schema';

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

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
