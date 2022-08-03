import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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
    const user = await this.usersService.isLoginExists(userDto.login);
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }
    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordEquals) {
      throw new ForbiddenException('Password is incorrect');
    }
    return await this.generateToken(user);
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.isLoginExists(createUserDto.login);
    if (user) {
      throw new BadRequestException(
        `User with login = ${createUserDto.login} already exists`,
      );
    }
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
      token: this.jwtService.sign(payload),
    };
  }
}
