import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './User.schema';
import { CreateUserArgs } from '../dto/create-user.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserMutationResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserData', { type: () => CreateUserArgs })
    createUserData: CreateUserArgs,
  ) {
    console.log('createUserData', createUserData);
    return this.userService.create(createUserData);
  }
}
