import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

@Schema()
@ObjectType()
export class Todo {
  @Field(() => ID!)
  @Prop({ unique: true, required: true, default: v4 })
  id: string;

  @Field(() => ID!)
  @Prop({ required: true })
  userId: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  description: string;

  @Field()
  @Prop()
  status: string;

  @Field()
  @Prop()
  priority: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
