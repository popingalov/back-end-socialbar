import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateIngredientListDto } from './dto/create-ingredient-list.dto';
import { TakeIngredientListDto } from './dto/takeAllIngredient-list.dto';
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

  async findAll({ owner }: TakeIngredientListDto): Promise<IngredientList> {
    const result = await this.listModel
      .findOne({ owner }, '-owner')
      .populate('list', '-owner -__v');
    console.log(owner);

    return result;
  }

  async remove({
    owner,
    id,
  }: CreateIngredientListDto): Promise<IngredientList> {
    const result = await this.listModel
      .findOneAndUpdate({ owner }, { $pull: { list: id } }, { new: true })
      .populate('list');
    return result;
  }
}
