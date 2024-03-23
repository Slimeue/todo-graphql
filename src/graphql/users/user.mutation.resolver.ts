import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';
import { Public } from 'src/utils/public.decorators';
import { CreateUserInput } from './users.type';

@Resolver(() => User)
export class UserMutationResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Mutation(() => User)
  createUser(
    @Args('createUserData', { type: () => CreateUserInput })
    createUserData: CreateUserInput,
  ) {
    return this.userService.create(createUserData);
  }
}
