import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from '../users/user.service';
import { isEmpty } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from 'src/common.service';

@Injectable()
export class AuthService extends CommonService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async signin(AuthPayloadDto: AuthPayloadDto) {
    if (isEmpty(AuthPayloadDto.email)) {
      throw new HttpException('No email found', HttpStatus.NOT_FOUND);
    }

    let userJwt: string;

    const user = await this.userService.findOne(AuthPayloadDto);

    if (!isEmpty(user)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...email } = user;

      const isPasswordMatched = await this.comparePassword(
        AuthPayloadDto.password,
        password,
      );

      if (!isPasswordMatched) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      const payload = { user };

      userJwt = await this.jwtService.signAsync(payload);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      userJwt,
      userFound: user,
    };
  }

  async signUp(authPayLoad: AuthPayloadDto) {
    const user = await this.userService.create(authPayLoad);

    return user;
  }
}
