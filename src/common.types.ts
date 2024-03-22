import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum PriorityStatus {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  USER = 'USER',
  OWNER = 'OWNER',
}
registerEnumType(Role, { name: 'Role' });

@InputType()
export class PaginationInput {
  @Field(() => Number, { defaultValue: 1 })
  page?: number;

  @Field(() => Number, { defaultValue: 10 })
  limit?: number;

  @Field({ nullable: true })
  search?: string;

  @Field(() => String, { nullable: true })
  orderBy?: string;

  @Field(() => String, { nullable: true })
  accountId?: string;
}

@InputType()
export class TodoPaginationInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  userId?: string;
}

@ObjectType('Meta')
export class Meta {
  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;
}

@InputType()
export class TodoCategoryPaginationInput extends PaginationInput {
  @Field(() => String, { nullable: true })
  userId?: string;
}
