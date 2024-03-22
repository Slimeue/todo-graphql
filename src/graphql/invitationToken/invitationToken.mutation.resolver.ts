import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InvitationToken } from './invitationToken.schema';
import { InvitationTokenService } from './invitationToken.service';
import { InvitationTokenCreateInput } from './invitationToken.types';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';

@Resolver(() => InvitationToken)
export class InvitationTokenMutationResolver {
  constructor(private invitationTokenService: InvitationTokenService) {}

  @Mutation(() => InvitationToken)
  async createInvitationToken(
    @Args('input', { type: () => InvitationTokenCreateInput })
    input: InvitationTokenCreateInput,
    @CurrentUser() user: User,
  ) {
    const { id } = user;

    const { workspaceId } = input;

    if (!id) {
      throw new Error('userId is required');
    }

    if (!workspaceId) {
      throw new Error('workspaceId is required');
    }

    const newInvitationToken = await this.invitationTokenService.create(
      id,
      input,
    );

    return newInvitationToken;
  }
}
