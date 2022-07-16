import { IAlbum, Artist, User, ITrack, IFavorites } from '../utils/interfaces';

export const users: User[] = [];
export const artists: Artist[] = [];
export const albums: IAlbum[] = [];
export const tracks: ITrack[] = [];
export const favs: IFavorites = {
  artists: [],
  albums: [],
  tracks: [],
};
