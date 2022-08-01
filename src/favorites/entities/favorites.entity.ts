import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Album, (album) => album.favorites, {
    cascade: true,
  })
  albums: Album[];

  @OneToMany(() => Artist, (artist) => artist.favorites, {
    cascade: true,
  })
  artists: Artist[];

  @OneToMany(() => Track, (track) => track.favorites, {
    cascade: true,
  })
  tracks: Track[];
}
