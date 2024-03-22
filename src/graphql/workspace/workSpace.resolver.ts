import { ResolveField, Resolver } from '@nestjs/graphql';
import { WorkSpace } from './workSpace.schema';
import { WorkSpaceMember } from '../workSpaceMember/workSpaceMember.schema';

@Resolver(() => WorkSpace)
export class WorkSpaceResolver {
  @ResolveField(() => [WorkSpaceMember])
  async members() {
    return [];
  }
}
