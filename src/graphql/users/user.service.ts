import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserArgs } from '../dto/create-user.input';
import { AuthPayloadDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserArgs) {
    const createdUser = await new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    const users = await this.userModel.find().exec();

    return users;
  }

  async findOne({ username }: FilterQuery<User>): Promise<User> {
    console.log('username', username);
    const user = await this.userModel.findOne({ id: username }).exec();
    return user;
  }
}
