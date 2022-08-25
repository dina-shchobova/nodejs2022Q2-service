import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Artist } from './artists/entities/artist.entity';
import { User } from './users/entities/user.entity';
import { Album } from './albums/entities/album.entity';
import { Track } from './tracks/entities/track.entity';
import { Favorite } from './favorites/entities/favorites.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: [User, Artist, Album, Track, Favorite],
  migrations: [],
});
