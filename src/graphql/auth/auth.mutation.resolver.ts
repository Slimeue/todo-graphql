import { Resolver } from '@nestjs/graphql';
import { User } from '../users/User.schema';

@Resolver(() => User)
export class AuthMutationResolver {
  // TODO: Implement AuthMutationResolver
}
