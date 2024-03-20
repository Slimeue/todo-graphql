import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './common.types';
import { User, UserDocument } from './graphql/users/User.schema';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(User.name) private readonly userRepo: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    let authUser: User;

    // console.log(context.switchToHttp().getRequest().req);

    if (context.getType() === 'http') {
      authUser = context.switchToHttp().getRequest().user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      authUser = ctx.getContext().req.user;
    }

    const currentUser = await this.userRepo.findOne({ id: authUser.id });

    return roles.some((role) => currentUser.roles?.includes(role));
  }
}
