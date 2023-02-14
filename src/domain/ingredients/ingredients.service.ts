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
import filterShopingIngredientList from '../../helpers/filterShopingIngredientList';
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
    const langBody = {
      owner: ingredient.owner,
      en: ingredient,
    };

    const newIngredient = await this.ingredientModel.create(langBody);
    // await newIngredient.save();
    return newIngredient;
  }

  async getDefault({ owner, lang = 'en' }): Promise<Ingredient[]> {
    const defaultOwner = process.env.OWNER;
    const [ingredients, { all }, shopingList, ingredientList]: [
      Ingredient[],
      IMyCocktails,
      ShopingList,
      IngredientList,
    ] = await Promise.all([
      this.ingredientModel.find({ owner: defaultOwner }, `${lang}`),
      this.cocktailsService.getMyCocktails({ owner: defaultOwner, lang }),
      this.shopingListModel.findOne({ owner }),
      this.ingredientListtModel.findOne({ owner }),
    ]);
    console.log(ingredients);

    const result = filterShopingIngredientList({
      ingredients,
      shopingList,
      ingredientList,
      all,
      lang,
    });

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
        `${lang}`,
      ),
      this.cocktailsService.getMyCocktails({ owner, lang }),
      this.shopingListModel.findOne({ owner }),
      this.ingredientListtModel.findOne({ owner }),
    ]);
    console.log(all);

    const result = filterShopingIngredientList({
      ingredients,
      shopingList,
      ingredientList,
      all,
    });

    return result;
  }

  async getIngredientById({ id, lang = 'en' }) {
    const ingredient = await this.ingredientModel.findById(id, `${lang}`);
    if (!ingredient) {
      errorGenerator('Wrong ID , ingredient not found', 'NOT_FOUND');
    }

    ingredient[lang].cocktails = await this.cocktailsService.findByIngredient({
      id,
      lang,
    });

    return ingredient[lang];
  }

  async deleteIngredient({ id, owner }): Promise<void> {
    await this.ingredientModel.findOneAndDelete({ _id: id, owner });
  }

  async updateIngredient(
    id: Types.ObjectId,
    lang: string = 'en',
    body,
  ): Promise<Ingredient> {
    const oldData = await this.ingredientModel.findById(id);
    const {
      cocktails,
      category,
      picture,
      isDefault,
      availability,
      shopping,
      iHave,
    } = oldData[lang];
    const { title, description } = body;
    const newData = {
      [lang]: {
        id,
        title,
        description,
        cocktails,
        category,
        picture,
        isDefault,
        availability,
        shopping,
        iHave,
      },
    };
    const updateCocktail = this.ingredientModel.findOneAndUpdate(
      { _id: id },
      { $set: newData },
      {
        new: true,
      },
    );

    return await updateCocktail;
  }
}
