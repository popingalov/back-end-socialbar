import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite, FavoriteSchema } from './shema/favorite.schema';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Favorite.name,
        schema: FavoriteSchema,
      },
    ]),
  ],
  exports: [FavoriteService],
})
export class FavoriteModule {}
