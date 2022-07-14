import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artists, tracks } from '../data/data';
import { v4 } from 'uuid';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist(v4(), createArtistDto);
    artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    let artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist = { ...artist, ...updateArtistDto };
    return artist;
  }

  remove(id: string) {
    const deletedArtistIndex = artists.findIndex((artist) => artist.id === id);
    if (deletedArtistIndex === -1) {
      throw new NotFoundException('Artist not found');
    }
    artists.splice(deletedArtistIndex, 1);
    const trackIndex = tracks.findIndex((track) => track.artistId === id);
    if (trackIndex !== -1) {
      tracks[trackIndex].artistId = null;
    }
    return `The artist with id = ${id} was deleted`;
  }
}
