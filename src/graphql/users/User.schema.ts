import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './UserSettings.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';
import { Todo } from '../todo/todo.schema';
import { Injectable } from '@nestjs/common';

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

  @Field({ nullable: true })
  @Prop()
  displayName?: string;

  @Field((type) => [Todo], { nullable: 'itemsAndList' })
  @Prop()
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
