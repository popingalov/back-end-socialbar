import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IngredientList,
  IngredientListDocument,
} from './schema/ingredientList.schema';

@Injectable()
export class IngredientListService {
  constructor(
    @InjectModel(IngredientList.name)
    private readonly listModel: Model<IngredientListDocument>,
  ) {}

  async create({ owner, id }): Promise<IngredientList> {
    const test = await this.listModel.findOne({ owner });
    if (!test) await this.listModel.create({ owner });

    const result = await this.listModel
      .findOneAndUpdate({ owner }, { $push: { list: id } }, { new: true })
      .populate('list');
    return result;
  }

  async getAll({ owner }): Promise<IngredientList> {
    const result = await this.listModel
      .findOne({ owner }, '-owner')
      .populate('list', '-owner -__v');

    return result;
  }

  async remove({ owner, id }): Promise<IngredientList> {
    const result = await this.listModel
      .findOneAndUpdate({ owner }, { $pull: { list: id } }, { new: true })
      .populate('list');
    return result;
  }
}
