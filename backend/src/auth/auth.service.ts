import { compare } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login-dto';
import { JwtPayload } from './jwt-strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login({ username, password }: LoginDto): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user)
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch)
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);

    const token = this._createToken(user);

    return { ...token, data: user };
  }

  private _createToken({ username }): any {
    const user: JwtPayload = { username };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser({ username }: JwtPayload): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
