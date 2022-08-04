import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

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
    return await this.generateToken(user);
  }

  async signup(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });
    return await this.generateToken(newUser);
  }

  async generateToken(user) {
    const payload = { login: user.login, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
