import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

export type WorkSpaceDocument = WorkSpace & Document;

@Schema({ timestamps: true })
@ObjectType()
export class WorkSpace {
  @Field(() => ID)
  @Prop({ type: String, required: true, unique: true, default: v4 })
  id: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  name: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  ownerId: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description: string;
}

export const WorkSpaceSchema = SchemaFactory.createForClass(WorkSpace);
