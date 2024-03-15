import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/public.decorators';
import { Response } from 'express';
import { omit } from 'lodash';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(@Res() res: Response, @Body() input: AuthPayloadDto) {
    const resp = await this.authService.signUp(input);

    const cleanUser = omit(resp.toObject(), ['password', 'salt']);
    res.status(201).json(cleanUser);
  }

  @Public()
  @Post('login')
  async login(@Body() authPayLoad: AuthPayloadDto, @Res() res: Response) {
    const resp = await this.authService.signin(authPayLoad);

    const { userJwt, userFound } = resp;
    return res.json({ user: userFound, token: userJwt });
  }
}
