import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(createUserDto: CreateUserDto) {}

  async signup(createUserDto: CreateUserDto) {}

  async create(createUserDto: CreateUserDto) {}
}
