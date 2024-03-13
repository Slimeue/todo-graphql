import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() authPayLoad: AuthPayloadDto) {
    const user = await this.authService.signin(authPayLoad);

    return user;
  }
}
