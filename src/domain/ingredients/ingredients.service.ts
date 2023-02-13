import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Ingredient, IngredientDocument } from './schema/ingredients.schema';
import { CocktailsService } from '../cocktails/cocktails.service';
//
import errorGenerator from '../../helpers/errorGenerator';
import {
  ShopingList,
  ShopingListDocument,
} from '../shoping-list/schema/shoping-list.schema';
import {
  IngredientList,
  IngredientListDocument,
} from '../ingredient-list/schema/ingredientList.schema';
import filter from '../../helpers/filterShopingIngredientList';
import { IMyCocktails } from '../cocktails/dto/returnMyCocktails.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<IngredientDocument>,
    @InjectModel(ShopingList.name)
    private readonly shopingListModel: Model<ShopingListDocument>,
    @InjectModel(IngredientList.name)
    private readonly ingredientListtModel: Model<IngredientListDocument>,
    private readonly cocktailsService: CocktailsService,
  ) {}

  async createIngredient(ingredient): Promise<Ingredient> {
    const newIngredient = new this.ingredientModel(ingredient);

    return await newIngredient.save();
  }

  async getDefault({ owner, lang = 'en' }): Promise<Ingredient[]> {
    const defaultOwner = process.env.OWNER;
    const [ingredients, { all }, shopingList, ingredientList]: [
      Ingredient[],
      IMyCocktails,
      ShopingList,
      IngredientList,
    ] = await Promise.all([
      this.ingredientModel.find({ owner: defaultOwner }, '-owner'),
      this.cocktailsService.getMyCocktails({ owner: defaultOwner, lang }),
      this.shopingListModel.findOne({ owner }),
      this.ingredientListtModel.findOne({ owner }),
    ]);
    const result = filter({ ingredients, shopingList, ingredientList, all });

    return result;
  }

  async getIngredients({ owner, lang = 'en' }): Promise<Ingredient[]> {
    const [ingredients, { all }, shopingList, ingredientList]: [
      Ingredient[],
      IMyCocktails,
      ShopingList,
      IngredientList,
    ] = await Promise.all([
      this.ingredientModel.find(
        {
          owner,
        },
        '-owner',
      ),
      this.cocktailsService.getMyCocktails({ owner, lang }),
      this.shopingListModel.findOne({ owner }),
      this.ingredientListtModel.findOne({ owner }),
    ]);
    const result = filter({ ingredients, shopingList, ingredientList, all });

    return result;
  }

  async getIngredientById({ id }) {
    const ingredient = await this.ingredientModel.findById(id);
    if (!ingredient) {
      errorGenerator('Wrong ID , ingredient not found', 'NOT_FOUND');
    }
    ingredient.cocktails = await this.cocktailsService.findByIngredient({ id });

    return ingredient.populate('cocktails.ingredients.data', ['id', 'title']);
  }

  async deleteIngredient({ id, owner }): Promise<void> {
    await this.ingredientModel.findOneAndDelete({ _id: id, owner });
  }

  async updateIngredient(id: Types.ObjectId, body): Promise<Ingredient> {
    const updateCocktail = this.ingredientModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return await updateCocktail;
  }
}
