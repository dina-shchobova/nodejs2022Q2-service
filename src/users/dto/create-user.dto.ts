//import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  // @Exclude()
  @IsString()
  @IsNotEmpty()
  password: string;

  // version: number; // integer number, increments on update
  // createdAt: number; // timestamp of creation
  // updatedAt: number; // timestamp of last update
}
