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
import { Ingredient } from './schema/ingredients.schema';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { JwtPublickGuard } from '../auth/strategies/publick.guard';

import { CreateIngredientDto } from './dto/create-ingredient-dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IdDto } from 'src/globalDto/id.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createIngredient(
    @Body() body: CreateIngredientDto,
    @Req() req,
  ): Promise<Ingredient> {
    return await this.ingredientsService.createIngredient({
      ...body,
      owner: req.user.id,
    });
  }

  @UseGuards(JwtPublickGuard)
  @Get()
  async getDefault(@Req() req): Promise<Ingredient[]> {
    const owner = req.user.id;
    return await this.ingredientsService.getDefault({ owner });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getIngredients(@Req() req): Promise<Ingredient[]> {
    return await this.ingredientsService.getIngredients({
      owner: req.user.id,
    });
  }

  @Get(':id')
  async getById(@Param() { id }: IdDto) {
    return await this.ingredientsService.getIngredientById({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param() { id }: IdDto, @Req() req): Promise<void> {
    const owner = req.user.id;
    return this.ingredientsService.deleteIngredient({ id, owner });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(
    @Body() body: UpdateIngredientDto,
    @Param() { id }: IdDto,
  ): Promise<Ingredient> {
    return await this.ingredientsService.updateIngredient(id, body);
  }
}
