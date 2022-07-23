import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 } from 'uuid';
import { favs, tracks } from '../data/data';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track(v4(), createTrackDto);
    tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    let track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    track = { ...track, ...updateTrackDto };
    return track;
  }

  remove(id: string) {
    const deletedTrackIndex = tracks.findIndex((track) => track.id === id);
    if (deletedTrackIndex === -1) {
      throw new NotFoundException('Track not found');
    }
    tracks.splice(deletedTrackIndex, 1);
    const favTrackIndex = favs.tracks.findIndex((trackId) => trackId === id);
    if (favTrackIndex !== -1) {
      favs.tracks.splice(favTrackIndex, 1);
    }
  }
}
