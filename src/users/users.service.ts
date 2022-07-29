import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // create(newUserDto: CreateUserDto) {
  //   let newUser = new User({});
  //   newUser.id = v4();
  //   newUser = {
  //     ...newUser,
  //     ...newUserDto,
  //     version: 1,
  //     createdAt: +Date.now(),
  //     updatedAt: +Date.now(),
  //   };
  //   users.push(newUser);
  //   return newUser;
  // }

  async create(newUserDto: CreateUserDto) {
    await this.isLoginExists(newUserDto.login);
    const createdUser = this.userRepository.create(newUserDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  // findAll() {
  //   return users;
  // }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  // findOne(id: string) {
  //   const user = users.find((user) => user.id === id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toResponse();
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const updatedUser = users.find((user) => user.id === id);
  //   if (!updatedUser) {
  //     throw new NotFoundException('User not found');
  //   }
  //   if (updatedUser.password !== updateUserDto.oldPassword) {
  //     throw new ForbiddenException('Wrong old password');
  //   }
  //   updatedUser.password = updateUserDto.newPassword;
  //   updatedUser.version = updatedUser.version + 1;
  //   updatedUser.updatedAt = +Date.now();
  //   return updatedUser;
  // }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    if (updatedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }
    Object.assign(updatedUser, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  // remove(id: string) {
  //   const updatedUserIndex: number = users.findIndex((user) => user.id === id);
  //   if (updatedUserIndex === -1) {
  //     throw new NotFoundException('User not found');
  //   }
  //   users.splice(updatedUserIndex, 1);
  // }

  async remove(id: string) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async isLoginExists(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) {
      throw new BadRequestException(
        `User with login = ${login} already exists`,
      );
    }
  }
}
