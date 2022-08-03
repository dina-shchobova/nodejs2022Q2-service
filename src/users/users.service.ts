import {
  Injectable,
  ForbiddenException,
  NotFoundException,
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

  async create(newUserDto: CreateUserDto) {
    const createdUser = this.userRepository.create(newUserDto);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user.toResponse();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!updatedUser) {
      throw new NotFoundException('User is not found');
    }
    if (updatedUser.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }
    updatedUser.version += 1;
    updatedUser.password = updateUserDto.newPassword;
    return (await this.userRepository.save(updatedUser)).toResponse();
  }

  async remove(id: string) {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('User is not found');
    }
  }

  async isLoginExists(login: string) {
    return await this.userRepository.findOne({ where: { login } });
  }
}
