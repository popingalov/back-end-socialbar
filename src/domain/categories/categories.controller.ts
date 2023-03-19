import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { Category } from './schema/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResultCategoryDto } from './dto/resultCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCocktailsCategories(): Promise<Category> {
    try {
      return await this.categoriesService.getByName();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('cocktails')
  async create(@Body() body: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoriesService.create({
        name: 'cocktails',
        items: body,
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
