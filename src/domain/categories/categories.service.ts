import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schema/categories.schema';

import { CreateCategoryDto } from './dto/create-category.dto';
// import { ResultCategoryDto } from './dto/resultCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getByName(): Promise<Category> {
    const categories = await this.categoryModel.find();
    const result: any = categories.reduce((acc, el) => {
      acc[el.name] = el.items;

      return acc;
    }, {});
    return result;
  }

  async create({ name, items }: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create({ name, items });
  }
}
