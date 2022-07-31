import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: [],
});
