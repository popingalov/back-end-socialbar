import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredientListDto } from './dto/create-ingredient-list.dto';
import { GetIngredientListDto } from './dto/get-ingredient-list.dto';
import { DeleteIngredientListDto } from './dto/delete-ingredient-list.dto';
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

  async create({
    owner,
    id,
  }: CreateIngredientListDto): Promise<IngredientList> {
    const test = await this.listModel.findOne({ owner });
    if (!test) await this.listModel.create({ owner });

    const result = await this.listModel
      .findOneAndUpdate({ owner }, { $push: { list: id } }, { new: true })
      .populate('list');
    return result;
  }

  async getAll({ owner }: GetIngredientListDto): Promise<IngredientList> {
    const result = await this.listModel
      .findOne({ owner }, '-owner')
      .populate('list', '-owner -__v');

    return result;
  }

  async remove({
    owner,
    id,
  }: DeleteIngredientListDto): Promise<IngredientList> {
    const result = await this.listModel
      .findOneAndUpdate({ owner }, { $pull: { list: id } }, { new: true })
      .populate('list');
    return result;
  }
}
