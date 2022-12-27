import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(@Req() req, @Param('id') id: string) {
    const owner = req.user.id;
    return this.favoriteService.create({ owner, id });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const owner = req.user.id;
    return this.favoriteService.findAll(owner);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }
}
