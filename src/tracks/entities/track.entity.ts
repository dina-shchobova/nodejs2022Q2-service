import { ITrack } from '../../utils/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity('track')
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  album: string;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
