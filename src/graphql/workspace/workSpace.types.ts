import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/common.types';

@InputType()
export class WorkSpaceCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;
}

@InputType()
export class WorkSpaceUpdateInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
