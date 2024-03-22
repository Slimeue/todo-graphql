import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { WorkSpaceMember } from './workSpaceMember.schema';
import { WorkSpaceMemberService } from './workSpaceMember.service';
import { InvitationTokenService } from '../invitationToken/invitationToken.service';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from '../users/user.schema';

@Resolver(() => WorkSpaceMember)
export class WorkSpaceMemberMutationResolver {
  constructor(
    private workSpaceMemberService: WorkSpaceMemberService,
    private invitationTokenService: InvitationTokenService,
  ) {}

  @Mutation(() => WorkSpaceMember)
  async acceptInvitation(
    @Args('token') tokenCode: string,
    @CurrentUser() user: User,
  ) {
    const { id } = user;

    if (!id) {
      throw new Error('userId is required');
    }

    if (!tokenCode) {
      throw new Error('token is required');
    }

    const invitationToken =
      await this.invitationTokenService.findOne(tokenCode);

    if (!invitationToken) {
      throw new Error('Invalid token');
    }

    const { workspaceId } = invitationToken;

    if (!workspaceId) {
      throw new Error('Invalid workspaceId');
    }

    const newWorkSpaceMember = await this.workSpaceMemberService.create(id, {
      workspaceId,
    });

    return newWorkSpaceMember;
  }
}
