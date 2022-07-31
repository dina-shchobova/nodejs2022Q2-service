import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = this.tracksRepository.create(createTrackDto);
    return await this.tracksRepository.save(newTrack);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id: id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    let track = await this.tracksRepository.findOne({ where: { id: id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    track = { ...track, ...updateTrackDto };
    return await this.tracksRepository.save(track);
  }

  async remove(id: string) {
    const result = await this.tracksRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Track not found');
    }
  }
}
