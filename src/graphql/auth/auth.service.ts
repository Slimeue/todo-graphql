import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from '../users/user.service';
import { isEmpty } from 'class-validator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(AuthPayloadDto: AuthPayloadDto) {
    if (isEmpty(AuthPayloadDto.username)) {
      throw new HttpException('No username found', HttpStatus.NOT_FOUND);
    }

    let userJwt: string;

    const userFound = await this.userService.findOne(AuthPayloadDto);

    if (!isEmpty(userFound)) {
      const { password, ...username } = userFound;

      if (password !== AuthPayloadDto.password) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }

      userJwt = await this.jwtService.signAsync({ username });
    }

    return {
      userJwt,
      userFound,
    };
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
