import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredients.schema';

import { Types } from 'mongoose';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createIngredient(@Body() body, @Req() req): Promise<Ingredient> {
    return await this.ingredientsService.createIngredient({
      ...body,
      owner: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getIngredients(@Req() req): Promise<Ingredient[]> {
    return await this.ingredientsService.getIngredients({
      owner: req.user.id,
    });
  }

  @Get()
  async getDefault(): Promise<Ingredient[]> {
    return await this.ingredientsService.getDefault();
  }

  @Get(':id')
  async getById(@Param() { id }) {
    return await this.ingredientsService.getIngredientById({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string, @Req() req): Promise<void> {
    const owner = req.user.id;
    return this.ingredientsService.deleteIngredient({ id, owner });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(
    @Body() body,
    @Param('id') id: Types.ObjectId,
  ): Promise<Ingredient> {
    return await this.ingredientsService.updateIngredient(id, body);
  }
}
