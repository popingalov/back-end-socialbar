import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './shema/favorite.schema';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('shoping-list')
export class ShopingListController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body) {
    const { id, owner } = body;
    return this.favoriteService.createFavorite({ id, owner });
  }

  @Get()
  getAll(): Promise<Favorite[]> {
    return this.favoriteService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.favoriteService.deleteFavorite(id);
  }
}
