import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(id: string, createArtistDto: CreateArtistDto) {
    this.id = id;
    this.name = createArtistDto.name;
    this.grammy = createArtistDto.grammy;
  }
}
