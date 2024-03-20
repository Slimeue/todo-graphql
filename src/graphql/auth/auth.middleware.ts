import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: (error?: any) => void) {
    // throw new Error('Method not implemented.');

    const token = req?.headers?.authorization.split(' ')[1] || '';

    if (token) {
      try {
        const user = this.jwtService.verify(token, {
          secret: SECRET_KEY,
        });
        console.log('User, AuthMiddleware...', user);
      } catch (e) {
        console.log('Error...', e);
      }
    }
    next();
  }
}
