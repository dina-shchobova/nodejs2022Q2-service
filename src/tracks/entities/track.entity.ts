import { ITrack } from '../../utils/interfaces';
import { CreateTrackDto } from '../dto/create-track.dto';

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(id: string, createTrackDto: CreateTrackDto) {
    this.id = id;
    this.name = createTrackDto.name;
    this.artistId = createTrackDto.artistId;
    this.albumId = createTrackDto.albumId;
    this.duration = createTrackDto.duration;
  }
}
