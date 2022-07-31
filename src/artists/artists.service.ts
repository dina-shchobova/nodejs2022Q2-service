import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistsRepository.create(createArtistDto);
    return await this.artistsRepository.save(newArtist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOne({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    let artist = await this.artistsRepository.findOne({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist = { ...artist, ...updateArtistDto };
    return await this.artistsRepository.save(artist);
  }

  async remove(id: string) {
    const result = await this.artistsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }
  }
}
