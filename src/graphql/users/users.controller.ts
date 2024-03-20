import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthPayloadDto } from '../auth/dto/auth.dto';
import { CurrentUser } from '../auth/decorator/currentUser.decorator';
import { User } from './user.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/common.types';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get(`:username`)
  @Roles(Role.MEMBER)
  @UseGuards(RolesGuard)
  async getProfile(@Param() username: AuthPayloadDto) {
    const user = await this.userService.findOne(username);
    return user;
  }
}
