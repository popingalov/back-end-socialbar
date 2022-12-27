import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

import { IngredientsService } from './ingredients.service';
import { Ingredient } from './ingredients.schema';

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
}
