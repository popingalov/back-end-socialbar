import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Cocktail, CocktailDocument } from './cocktails.schema';
import {
  IngredientListDocument,
  IngredientList,
} from '../ingredient-list/schema/ingredientList.schema';

import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { FindByIngredientDto } from './dto/find-by-ingredient.dto';
import { CocktailDto } from './dto/cocktail.dto';
//
import filterCocktails from '../../helpers/filterCocktails';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
    @InjectModel(IngredientList.name)
    private readonly ShopingListService: Model<IngredientListDocument>,
  ) {}

  async createOne(cocktail: CreateCocktailDto): Promise<Cocktail> {
    const newCocktail = new this.cocktailModel(cocktail);

    return await newCocktail.save();
  }

  // async getDefault(): Promise<any> {
  async getDefault() {
    const cocktails: CocktailDto[] = await this.cocktailModel
      .find({ email: process.env.OWNER })
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');

    const ingredients = await this.ShopingListService.findOne({
      email: process.env.OWNER,
    });

    const result = filterCocktails(cocktails, ingredients);
    return result;
  }

  async getMyCocktails({ owner }) {
    const cocktails = await this.cocktailModel
      .find({ owner })
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');

    const ingredients = await this.ShopingListService.findOne({
      email: owner,
    });

    const result = filterCocktails(cocktails, ingredients);
    return result;
  }

  async getById({ id }: FindByIdDto): Promise<Cocktail> {
    return await this.cocktailModel
      .findById(id)
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');
  }

  async deleteMy({ userId, id }): Promise<void> {
    await this.cocktailModel.findOneAndDelete({ owner: userId, id });
  }

  async findByIngredient({ id }: FindByIngredientDto): Promise<Cocktail[]> {
    return await this.cocktailModel.find({ 'ingredients.data': id });
  }

  async updateOne(
    id: Types.ObjectId,
    cocktail: UpdateCocktailDto,
  ): Promise<Cocktail> {
    const { title, description } = cocktail;
    const updateCocktail = this.cocktailModel.findByIdAndUpdate(
      id,
      { title, description },
      {
        new: true,
      },
    );

    return await updateCocktail;
  }
}
