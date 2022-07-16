export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface IFavoritesResponse {
  artists: Artist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
