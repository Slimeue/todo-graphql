import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserArgs } from '../dto/create-user.input';
import { CommonService } from 'src/common.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserArgs) {
    const salt = await this.commonService.generateSalt(3);
    const password = await this.commonService.hashPassword(
      createUserDto.password,
      salt,
    );

    const createdUser = await new this.userModel(createUserDto);
    createdUser.password = password;
    createdUser.salt = salt;
    
    return createdUser.save();
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne({ username }: FilterQuery<User>): Promise<User> {
    const user = await this.userModel.findOne({ username: username }).exec();
    return user;
  }
}
