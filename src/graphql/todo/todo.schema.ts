import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PriorityStatus } from 'src/common.types';
import { v4 } from 'uuid';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Todo {
  @Field(() => ID!)
  @Prop({ unique: true, required: true, default: v4 })
  id: string;

  @Field(() => ID!)
  @Prop({ required: true })
  userId: string;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description: string;

  @Field()
  @Prop()
  status: string;

  @Field()
  @Prop()
  priority: PriorityStatus;

  @Field(() => ID, { nullable: true })
  @Prop()
  categoryId: string;

  @Field(() => String, { nullable: true })
  @Prop()
  category: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
