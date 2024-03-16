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
    if (isEmpty(AuthPayloadDto.username)) {
      throw new HttpException('No username found', HttpStatus.NOT_FOUND);
    }

    let userJwt: string;

    const user = await this.userService.findOne(AuthPayloadDto);

    if (!isEmpty(user)) {
      const { password, ...username } = user;

      const isPasswordMatched = await this.comparePassword(
        AuthPayloadDto.password,
        password,
      );

      if (!isPasswordMatched) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      console.log('userFound', user);

      const payload = { user };

      userJwt = await this.jwtService.signAsync(payload);
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

  async validateUser(AuthPayloadDto: AuthPayloadDto): Promise<AuthPayloadDto> {
    const foundUser = await this.userService.findOne(AuthPayloadDto);
    if (!foundUser) {
      return null;
    }
    if (foundUser.password !== AuthPayloadDto.password) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    const { password, ...user } = foundUser;
    return foundUser;
  }
}
