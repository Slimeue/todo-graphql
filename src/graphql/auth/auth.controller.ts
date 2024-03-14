import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/public.decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() authPayLoad: AuthPayloadDto, @Res() res: Response) {
    const resp = await this.authService.signin(authPayLoad);

    const { userJwt, userFound } = resp;

    return res.json({ user: userFound, token: userJwt });
  }
}
