import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

@Schema({ timestamps: true })
@ObjectType()
export class WorkSpaceRoom {
  @Field(() => ID)
  @Prop({ default: v4 })
  id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String)
  @Prop()
  workspaceId: string;
}

export type WorkSpaceRoomDocument = WorkSpaceRoom & Document;
export const WorkSpaceRoomSchema = SchemaFactory.createForClass(WorkSpaceRoom);
