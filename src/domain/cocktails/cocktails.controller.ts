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
import { JwtPublickGuard } from '../auth/strategies/publick.guard';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailService: CocktailsService) {}

  async getDefault(@Req() req): Promise<{
    haveAll: Cocktail[];
    needMore: Cocktail[];
    other: Cocktail[];
    all: Cocktail[];
  }> {
    return await this.cocktailService.getDefault();
  }

  @UseGuards(JwtPublickGuard)
  @Get()
  async getAll(@Req() req): Promise<{
    haveAll: Cocktail[];
    needMore: Cocktail[];
    other: Cocktail[];
    mine: { haveAll: Cocktail[]; other: Cocktail[] } | null;
    all: Cocktail[];
  }> {
    const { id, trigger } = req.user;
    if (trigger) {
      return await this.cocktailService.getDefault();
    }
    return await this.cocktailService.getMyCocktails({
      owner: id,
    });
  }

  // @Post('/my')
  @UseGuards(JwtAuthGuard)
  async getMyCocktails(@Req() req): Promise<{
    haveAll: Cocktail[];
    needMore: Cocktail[];
    other: Cocktail[];
    mine: { haveAll: Cocktail[]; other: Cocktail[] } | null;
    all: Cocktail[];
  }> {
    const { id } = req.user;
    return await this.cocktailService.getMyCocktails({
      owner: id,
    });
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
