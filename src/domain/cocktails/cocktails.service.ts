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
import filterDefault from '../../helpers/filterDefaultCocktails';
import filterMy from '../../helpers/filterMyCocktails';

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

  async getDefault() {
    const cocktails: CocktailDto[] = await this.cocktailModel
      .find({ email: process.env.OWNER })
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');

    const ingredients = await this.ShopingListService.findOne({
      email: process.env.OWNER,
    });

    const result = filterDefault(cocktails, ingredients);
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

    const myObj = filterMy(cocktails, ingredients);
    const defaultObj = await this.getDefault();
    const mine = myObj.all.length === 0 ? null : myObj.mine;

    const result = {
      haveAll: myObj.haveAll.concat(defaultObj.haveAll),
      needMore: myObj.needMore.concat(defaultObj.needMore),
      other: myObj.other.concat(defaultObj.other),
      all: myObj.all.concat(defaultObj.all),
      mine,
    };
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
