import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      const categories = await this.categoryModel.find();
      //const result: any = categories.reduce((acc, el) => {
      //  acc[el.name] = el.items;
      //  return acc;
      //}, {});

      const result: any = categories.reduce((acc, { en }) => {
        acc[en.name] = en.items;
        return acc;
      }, {});
      return result;
    } catch (error) {
      throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async create({ name, items }): Promise<Category> {
    try {
      const result = await this.categoryModel.create({ en: { name, items } });
      return result;
    } catch (error) {
      throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
