import {
  IAlbum,
  IArtist,
  IUser,
  ITrack,
  IFavorites,
} from '../utils/interfaces';

export const users: IUser[] = [];
export const artists: IArtist[] = [];
export const albums: IAlbum[] = [];
export const tracks: ITrack[] = [];
export const favs: IFavorites = {
  artists: [],
  albums: [],
  tracks: [],
};
