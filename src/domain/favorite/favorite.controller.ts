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

import { IdDto } from 'src/globalDto/id.dto';
import { JwtPublickGuard } from '../auth/strategies/publick.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: IdDto, @Req() req) {
    const { id } = body;
    return this.favoriteService.createFavorite({ id, owner: req.user.id });
  }

  @UseGuards(JwtPublickGuard)
  @Get()
  getAll(@Req() req): Promise<Favorite> {
    return this.favoriteService.getAll({
      owner: req.user.id,
      lang: 'en',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param() { id }: IdDto, @Req() req): Promise<void> {
    const owner = req.user.id;
    return this.favoriteService.deleteFavorite({ id, owner });
  }
}
