import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  @Prop({ unique: true, required: true, default: v4 })
  id: string;

  @Field()
  @Prop({ unique: true, required: true })
  username: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ required: true })
  salt: string;

  @Field({ nullable: true })
  @Prop()
  displayName?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
