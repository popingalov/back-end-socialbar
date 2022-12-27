import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './favorite.schema';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  postFavorite(@Body() body): Promise<Favorite> {
    return this.favoriteService.postFavorite({ body });
  }

  @Get()
  getFavorites(): Promise<Favorite[]> {
    return this.favoriteService.getFavorites();
  }

  @Delete(':id')
  removeFavorite(@Param('id') id: string) {
    return this.favoriteService.removeFavorite(+id);
  }
}
