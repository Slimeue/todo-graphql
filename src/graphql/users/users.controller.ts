import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthPayloadDto } from '../auth/dto/auth.dto';
import { MONGO_URL } from 'src/config';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get(`:username`)
  async getProfile(@Param() username: AuthPayloadDto) {
    console.log('id', MONGO_URL);
    const user = await this.userService.findOne(username);
    return user;
  }
}
