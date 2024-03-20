import { Resolver } from '@nestjs/graphql';
import { User } from '../users/user.schema';

@Resolver(() => User)
export class AuthMutationResolver {
  // TODO: Implement AuthMutationResolver
}
