import { Controller, Get } from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { Category } from './categories.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('cocktails')
  async getCocktailsCategories(): Promise<Category> {
    return await this.categoriesService.getByName({
      name: 'cocktails',
    });
  }

  @Get('ingredients')
  async getIngredientsCategories(): Promise<Category> {
    return await this.categoriesService.getByName({
      name: 'ingredients',
    });
  }
}
