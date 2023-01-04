import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './shema/favorite.schema';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body, @Req() req) {
    const { id } = body;
    return this.favoriteService.createFavorite({ id, owner: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req): Promise<Favorite> {
    return this.favoriteService.getAll({
      owner: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req): Promise<void> {
    const owner = req.user.id;
    return this.favoriteService.deleteFavorite(id, owner);
  }
}
