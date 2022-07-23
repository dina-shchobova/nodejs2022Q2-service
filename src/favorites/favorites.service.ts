import { Injectable, NotFoundException } from '@nestjs/common';
import { albums, artists, favs, tracks } from '../data/data';
import { IFavoritesResponse } from '../utils/interfaces';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';

@Injectable()
export class FavoritesService {
  createFavArtist(id: string) {
    const favArtist = artists.find((artist) => artist.id === id);
    if (!favArtist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    favs.artists.push(id);
  }

  createFavAlbum(id: string) {
    const favAlbum = albums.find((album) => album.id === id);
    if (!favAlbum) {
      throw new UnprocessableEntityException('Album not found');
    }
    favs.albums.push(id);
  }

  createFavTrack(id: string) {
    const favTrack = tracks.find((track) => track.id === id);
    if (!favTrack) {
      throw new UnprocessableEntityException('Track not found');
    }
    favs.tracks.push(id);
  }

  findAll() {
    const { albums: favAlbums, artists: favArtists, tracks: favTracks } = favs;
    const allFavs: IFavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };

    if (favAlbums.length) {
      favAlbums.forEach((id) => {
        const favAlbum = albums.find((album) => album.id === id);
        allFavs.albums.push(favAlbum);
      });
    }

    if (favArtists.length) {
      favArtists.forEach((id) => {
        const favArtist = artists.find((artist) => artist.id === id);
        allFavs.artists.push(favArtist);
      });
    }

    if (favTracks.length) {
      favTracks.forEach((id) => {
        const favTrack = tracks.find((track) => track.id === id);
        allFavs.tracks.push(favTrack);
      });
    }
    return allFavs;
  }

  removeFavTrack(id: string) {
    const deletedFavTrackIndex = favs.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (deletedFavTrackIndex === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    favs.tracks.splice(deletedFavTrackIndex, 1);
  }

  removeFavArtist(id: string) {
    const deletedFavArtistIndex = favs.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (deletedFavArtistIndex === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    favs.artists.splice(deletedFavArtistIndex, 1);
  }

  removeFavAlbum(id: string) {
    const deletedFavAlbumIndex = favs.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (deletedFavAlbumIndex === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    favs.albums.splice(deletedFavAlbumIndex, 1);
  }
}
