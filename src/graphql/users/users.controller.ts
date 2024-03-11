import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthPayloadDto } from '../auth/dto/auth.dto';
import { Public } from 'src/utils/public.decorators';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Public()
  @Get(`:username`)
  async getProfile(@Param() username: AuthPayloadDto) {
    console.log('id', username);
    const user = await this.userService.findOne(username);
    return user;
  }
}
