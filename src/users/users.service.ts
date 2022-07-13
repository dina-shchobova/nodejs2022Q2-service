import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../data/data';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  create(newUserDto: CreateUserDto) {
    let newUser = new User({});
    newUser.id = v4();
    newUser = {
      ...newUser,
      ...newUserDto,
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
    };
    users.push(newUser);
    return newUser;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = users.find((user) => user.id === id);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    if (updatedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }
    updatedUser.password = updateUserDto.newPassword;
    updatedUser.version = updatedUser.version + 1;
    updatedUser.updatedAt = +Date.now();
    return updatedUser;
  }

  remove(id: string) {
    const updatedUserIndex: number = users.findIndex((user) => user.id === id);
    if (updatedUserIndex === -1) {
      throw new NotFoundException('User not found');
    }
    users.splice(updatedUserIndex, 1);
    return `${id} user was deleted`;
  }
}
