import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumsRepository.create(createAlbumDto);
    return await this.albumsRepository.save(newAlbum);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let album = await this.albumsRepository.findOne({ where: { id: id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    album = { ...album, ...updateAlbumDto };
    return await this.albumsRepository.save(album);
  }

  async remove(id: string) {
    const result = await this.albumsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Album not found');
    }
  }
}
