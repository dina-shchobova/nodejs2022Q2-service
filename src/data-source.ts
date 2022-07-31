import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Artist } from './artists/entities/artist.entity';
import { User } from './users/entities/user.entity';
import { Album } from './albums/entities/album.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: [User, Artist, Album],
  migrations: [],
});
