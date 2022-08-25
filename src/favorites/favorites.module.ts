import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorites.entity';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AlbumsModule,
    TracksModule,
    ArtistsModule,
    TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => AuthModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
