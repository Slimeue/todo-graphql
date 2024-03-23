import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType('createUserInput')
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType('updateUserInput')
export class UpdateUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType('updateUserPasswordInput')
export class UpdateUserPasswordInput {
  @Field(() => String)
  confirmPassword: string;

  @Field(() => String)
  password: string;
}

@InputType('loginInput')
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
