import { IAlbum } from '../../utils/interfaces';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(id: string, createAlbumDto: CreateAlbumDto) {
    this.id = id;
    this.name = createAlbumDto.name;
    this.year = createAlbumDto.year;
    this.artistId = createAlbumDto.artistId;
  }
}
