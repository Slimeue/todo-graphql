import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

export type TodoCategoryDocument = TodoCategory & Document;

@Schema({ timestamps: true })
@ObjectType()
export class TodoCategory {
  @Field(() => ID!)
  @Prop({ unique: true, required: true, default: v4 })
  id: string;

  @Field(() => ID)
  @Prop({ required: true })
  userId: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description: string;
}

export const TodoCategorySchema = SchemaFactory.createForClass(TodoCategory);
