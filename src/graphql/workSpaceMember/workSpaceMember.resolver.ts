import { Resolver } from '@nestjs/graphql';
import { WorkSpaceMember } from './workSpaceMember.schema';

@Resolver(() => WorkSpaceMember)
export class WorkSpaceMemberResolver {}
