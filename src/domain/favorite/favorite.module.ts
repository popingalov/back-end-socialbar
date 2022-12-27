import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './schema/favorite.schema';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],
})
export class FavoriteModule {}
