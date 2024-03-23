import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common.types';
import { v4 } from 'uuid';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => ID)
  @Prop({ unique: true, required: true, default: v4 })
  id: string;

  @Field()
  @Prop({ unique: true, required: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ required: true })
  salt: string;

  @Field({ nullable: true })
  @Prop()
  displayName?: string;

  @Field(() => [Role], { defaultValue: [Role.USER] })
  @Prop({ required: true, type: [String], default: [Role.USER] })
  roles?: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
