import { Body, Controller, Get, Post } from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { Category } from './schema/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResultCategoryDto } from './dto/resultCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Promise<ResultCategoryDto>
  @Get()
  async getCocktailsCategories(): Promise<Category> {
    return await this.categoriesService.getByName();
  }

  @Post('cocktails')
  async create(@Body() body: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create({
      name: 'cocktails',
      items: body,
    });
  }
}
