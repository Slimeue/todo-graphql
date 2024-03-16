import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthPayloadDto } from '../auth/dto/auth.dto';
import { MONGO_URL } from 'src/config';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from './User.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get(`:username`)
  async getProfile(
    @CurrentUser() currentUser: User,
    @Param() username: AuthPayloadDto,
  ) {
    console.log('currentUser', currentUser);
    const user = await this.userService.findOne(username);
    return user;
  }
}
