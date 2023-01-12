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

  async getDefault({ owner }): Promise<Ingredient[]> {
    const ingredients: Ingredient[] = await this.ingredientModel.find(
      { owner: process.env.OWNER },
      '-owner',
    );

    const shopingList = await this.shopingListModel.findOne({ owner });
    const ingredientList = await this.ingredientListtModel.findOne({ owner });
    const result = filter({ ingredients, shopingList, ingredientList });

    return result;
  }

  async getIngredients({ owner }): Promise<Ingredient[]> {
    const ingredients: Ingredient[] = await this.ingredientModel.find(
      {
        owner,
      },
      '-owner',
    );
    const shopingList = await this.shopingListModel.findOne({ owner });
    const ingredientList = await this.ingredientListtModel.findOne({ owner });
    const result = filter({ ingredients, shopingList, ingredientList });

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
