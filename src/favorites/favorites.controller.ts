import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  createFavTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.createFavTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeFavTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeFavTrack(id);
  }

  @Post('album/:id')
  createFavAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.createFavAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeFavAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeFavAlbum(id);
  }

  @Post('artist/:id')
  createFavArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoritesService.createFavArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeFavArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    console.log('id deleted artist = ', id);
    return this.favoritesService.removeFavArtist(id);
  }
}
