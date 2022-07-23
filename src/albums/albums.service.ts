import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albums, favs, tracks } from '../data/data';
import { v4 } from 'uuid';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album(v4(), createAlbumDto);
    albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    album = { ...album, ...updateAlbumDto };
    return album;
  }

  remove(id: string) {
    const deletedAlbumIndex = albums.findIndex((album) => album.id === id);
    if (deletedAlbumIndex === -1) {
      throw new NotFoundException('Album not found');
    }
    albums.splice(deletedAlbumIndex, 1);
    const trackIndex = tracks.findIndex((track) => track.albumId === id);
    if (trackIndex !== -1) {
      tracks[trackIndex].albumId = null;
    }
    const favAlbumIndex = favs.albums.findIndex((albumId) => albumId === id);
    if (favAlbumIndex !== -1) {
      favs.albums.splice(favAlbumIndex, 1);
    }
  }
}
