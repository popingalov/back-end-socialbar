import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schema/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getByName(): Promise<Category> {
    const categories = await this.categoryModel.find({}, 'en');
    //const result: any = categories.reduce((acc, el) => {
    //  acc[el.name] = el.items;
    //  return acc;
    //}, {});

    const result: any = categories.reduce((acc, { en }) => {
      acc[en.name] = en.items;
      return acc;
    }, {});
    return result;
  }

  async create({ name, items }): Promise<Category> {
    const result = await this.categoryModel.create({ en: { name, items } });
    return result;
  }
}
