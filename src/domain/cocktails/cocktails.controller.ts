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

import { JwtAuthGuard } from 'domain/auth/strategies/jwt.guard';

import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { Types } from 'mongoose';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailService: CocktailsService) {}

  @Get()
  async getAll(): Promise<Cocktail[]> {
    return await this.cocktailService.getAll();
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

  @Put(':id')
  updateOne(
    @Body() cocktail: UpdateCocktailDto,
    @Param('id') id: string,
  ): string {
    const { title, description } = cocktail;

    return `Updated ${title} with id: ${id}. About: ${description}`;
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return `Deleted id - ${id}`;
  }
}
