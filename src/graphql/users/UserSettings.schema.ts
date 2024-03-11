import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class UserSetting {
  @Field(() => ID)
  @Prop()
  userId: string;

  @Field({ defaultValue: false })
  @Prop()
  recieveNotifcations: boolean;

  @Field({ defaultValue: false })
  @Prop()
  recieveEmails: boolean;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);
