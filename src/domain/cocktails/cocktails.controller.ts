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

import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { Types } from 'mongoose';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailService: CocktailsService) {}

  @Get()
  async getDefault(): Promise<Cocktail[]> {
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
  async getMyCoctails(@Req() req): Promise<Cocktail[]> {
    const { id } = req.user;
    return await this.cocktailService.getMyCocktails({ owner: id });
  }

  @Put(':id')
  updateOne(
    @Body() cocktail: UpdateCocktailDto,
    @Param('id') id: string,
  ): string {
    const { title, description } = cocktail;

    return `Updated ${title} with id: ${id}. About: ${description}`;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string, @Req() req): Promise<void> {
    const userId = req.user.id;
    return this.cocktailService.deleteMy({ userId, id });
  }
}
