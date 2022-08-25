import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorites.entity';
import { Repository } from 'typeorm';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class FavoritesService {
  constructor(
    private tracksService: TracksService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {
    this.findAll().then();
  }

  async findAll() {
    const allFavs = await this.favoritesRepository.find({
      relations: {
        albums: true,
        tracks: true,
        artists: true,
      },
    });
    if (!allFavs[0]) {
      await this.favoritesRepository.save({});
    }
    return allFavs[0];
  }

  async createFavArtist(id: string) {
    let favArtist;
    try {
      favArtist = await this.artistsService.findOne(id);
    } catch (e) {
      throw new UnprocessableEntityException('No Artist');
    }
    const allFavs = await this.findAll();
    allFavs.artists.push(favArtist);
    const res = await this.favoritesRepository.save(allFavs);
    return res;
  }

  async createFavAlbum(id: string) {
    let favAlbum;
    try {
      favAlbum = await this.albumsService.findOne(id);
    } catch (e) {
      throw new UnprocessableEntityException('No Artist');
    }
    const allFavs = await this.findAll();
    allFavs.albums.push(favAlbum);
    await this.favoritesRepository.save(allFavs);
    return favAlbum;
  }

  async createFavTrack(id: string) {
    let favTrack;
    try {
      favTrack = await this.tracksService.findOne(id);
    } catch (e) {
      throw new UnprocessableEntityException('No Track');
    }
    const allFavs = await this.findAll();
    allFavs.tracks.push(favTrack);
    const res = await this.favoritesRepository.save(allFavs);
    return res;
  }

  async removeFavTrack(id: string) {
    const allFavs = await this.findAll();
    const deletedFavTrackIndex = allFavs.tracks.findIndex(
      (trackId) => trackId.id === id,
    );
    if (deletedFavTrackIndex === -1) {
      throw new UnprocessableEntityException('Track not found in favorites');
    }
    allFavs.tracks.splice(deletedFavTrackIndex, 1);
    await this.favoritesRepository.save(allFavs);
  }

  async removeFavArtist(id: string) {
    const allFavs = await this.findAll();
    const deletedFavArtistIndex = allFavs.artists.findIndex(
      (artistId) => artistId.id === id,
    );
    if (deletedFavArtistIndex === -1) {
      throw new UnprocessableEntityException('Artist not found in favorites');
    }
    allFavs.artists.splice(deletedFavArtistIndex, 1);
    await this.favoritesRepository.save(allFavs);
  }

  async removeFavAlbum(id: string) {
    const allFavs = await this.findAll();
    const deletedFavAlbumIndex = allFavs.albums.findIndex(
      (albumId) => albumId.id === id,
    );
    if (deletedFavAlbumIndex === -1) {
      throw new UnprocessableEntityException('Album not found in favorites');
    }
    allFavs.albums.splice(deletedFavAlbumIndex, 1);
    await this.favoritesRepository.save(allFavs);
  }
}
