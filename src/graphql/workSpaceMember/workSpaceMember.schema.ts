import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common.types';
import { v4 } from 'uuid';

@Schema({ timestamps: true })
@ObjectType()
export class WorkSpaceMember {
  @Field(() => ID)
  @Prop({ required: true, unique: true, default: v4 })
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  workSpaceId: string;

  @Field(() => ID)
  @Prop({ required: true })
  memberId: string;

  @Field(() => String)
  @Prop({ required: true })
  email: string;

  @Field(() => [Role])
  @Prop({ type: [String], default: [Role.MEMBER] })
  roles?: Role[];
}

export type WorkSpaceMemberDocument = WorkSpaceMember & Document;
export const WorkSpaceMemberSchema =
  SchemaFactory.createForClass(WorkSpaceMember);
