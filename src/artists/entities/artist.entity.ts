import { CreateArtistDto } from '../dto/create-artist.dto';
import { IArtist } from '../../utils/interfaces';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(id: string, createArtistDto: CreateArtistDto) {
    this.id = id;
    this.name = createArtistDto.name;
    this.grammy = createArtistDto.grammy;
  }
}
