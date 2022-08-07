import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    let user;
    const users = await this.usersService.findByLogin(userDto.login);
    if (users.length === 0) {
      throw new ForbiddenException('User does not exist');
    } else {
      for (const user1 of users) {
        const isValidPassword = await bcrypt.compare(
          userDto.password,
          user1.password,
        );
        if (isValidPassword) {
          user = user1;
        }
      }
    }
    if (!user) {
      throw new ForbiddenException('Password is incorrect');
    }
    const tokens = await this.generateTokens(user);
    await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signup(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );
    await this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });
    //return await this.generateTokens(newUser);
  }

  async generateTokens(user) {
    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async generateAccessToken(user) {
    const payload = { login: user.login, id: user.id };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user) {
    const payload = { login: user.login, id: user.id };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY_REFRESH_KEY || 'secret_key_refresh',
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '24h',
    });
  }

  async refresh(userId, body) {
    const { refreshToken } = body;
    if (!refreshToken) {
      throw new UnauthorizedException('No refreshToken in body');
    }
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }
    if (user.hashedRefreshToken === refreshToken) {
      const payload = this.jwtService.decode(refreshToken) as JwtPayload;
      if (payload.exp < +Date.now() / 1000) {
        throw new ForbiddenException('Refresh token is expired');
      }
      const tokens = await this.generateTokens(user);
      await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } else {
      throw new ForbiddenException('Refresh token is invalid');
    }
  }
}
