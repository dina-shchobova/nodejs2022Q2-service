import { Exclude } from 'class-transformer';
import { IUser } from '../../utils/interfaces';

export class User implements IUser {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
