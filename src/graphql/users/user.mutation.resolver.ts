import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.schema';
import { CreateUserArgs } from '../dto/create-user.input';
import { UserService } from './user.service';
import { Public } from 'src/utils/public.decorators';

@Resolver(() => User)
export class UserMutationResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Mutation(() => User)
  createUser(
    @Args('createUserData', { type: () => CreateUserArgs })
    createUserData: CreateUserArgs,
  ) {
    return this.userService.create(createUserData);
  }
}
