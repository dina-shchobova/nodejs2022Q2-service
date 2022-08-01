import { IAlbum } from '../../utils/interfaces';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Favorite } from '../../favorites/entities/favorites.entity';

@Entity('album')
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.album, {
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  @ManyToOne(() => Favorite, (favorite) => favorite.albums, {
    onDelete: 'CASCADE',
  })
  favorites: Favorite;
}
