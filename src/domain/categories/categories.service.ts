import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category, CategoryDocument } from './categories.schema';

import { FindByNameDto } from './dto/find-by-name.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async getByName(name: FindByNameDto) {
    return await this.categoryModel.findOne(name);
  }
}
