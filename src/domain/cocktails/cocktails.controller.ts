import {
  Controller,
  Get,
  Post,
  Res,
  Put,
  Delete,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

import { CocktailsService } from './cocktails.service';
import { Cocktail } from './cocktails.schema';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { Types } from 'mongoose';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailService: CocktailsService) {}

  @Get()
  async getDefault(@Req() req): Promise<{
    ican: Cocktail[];
    needMore: Cocktail[];
    other: Cocktail[];
  }> {
    return await this.cocktailService.getDefault();
  }

  @Get(':id')
  async getOne(@Param('id') id: Types.ObjectId): Promise<Cocktail> {
    return await this.cocktailService.getById({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCocktail(@Body() body, @Req() req): Promise<Cocktail> {
    const { id } = req.user;

    return await this.cocktailService.createOne({ ...body, owner: id });
  }

  @Post('/my')
  @UseGuards(JwtAuthGuard)
  async getMyCocktails(@Req() req): Promise<{
    ican: Cocktail[];
    needMore: Cocktail[];
    other: Cocktail[];
  }> {
    const { id } = req.user;

    return await this.cocktailService.getMyCocktails({
      owner: id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string, @Req() req): Promise<void> {
    const userId = req.user.id;
    return this.cocktailService.deleteMy({ userId, id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(
    @Body() cocktail: UpdateCocktailDto,
    @Param('id') id: Types.ObjectId,
  ): Promise<Cocktail> {
    return await this.cocktailService.updateOne(id, cocktail);
  }
}
