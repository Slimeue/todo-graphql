import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

export type InvitationTokenDocument = InvitationToken & Document;

@Schema({
  timestamps: true,
  timeseries: {
    timeField: 'createdAt',
    metaField: 'metadata',
    granularity: 'seconds',
  },
  expireAfterSeconds: 60,
})
@ObjectType()
export class InvitationToken {
  @Field(() => ID)
  @Prop({ unique: true, default: v4 })
  id: string;

  @Field(() => String)
  @Prop()
  token: string;

  @Field(() => String)
  @Prop()
  userId: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  workspaceId: string;
}

export const InvitationTokenSchema =
  SchemaFactory.createForClass(InvitationToken);
