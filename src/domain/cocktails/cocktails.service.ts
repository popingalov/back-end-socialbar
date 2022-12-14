import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

//
import { UpdateCocktailDto } from './dto/update-cocktail.dto';

//
import filterDefault from '../../helpers/filterDefaultCocktails';
import filterMy from '../../helpers/filterMyCocktails';
import { FavoriteService } from '../favorite/favorite.service';
import addFavoriteAndICan from '../../helpers/addFavoriteAndICan';
import errorGenerator from '../../helpers/errorGenerator';
import { Cocktail, CocktailDocument } from './shame/cocktails.schema';
import {
  IngredientListDocument,
  IngredientList,
} from '../ingredient-list/schema/ingredientList.schema';
import { Favorite } from '../favorite/shema/favorite.schema';
import { IDefaultCocktails } from './dto/returnDefaultCocktails.dto';
import { ShopingList } from '../shoping-list/schema/shoping-list.schema';
import { IMyCocktails } from './dto/returnMyCocktails.dto';
//

@Injectable()
export class CocktailsService {
  constructor(
    private readonly FavoriteService: FavoriteService,
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
    @InjectModel(IngredientList.name)
    private readonly IngredientListModel: Model<IngredientListDocument>,
  ) {}

  async createOne(cocktail): Promise<Cocktail> {
    const newCocktail = new this.cocktailModel(cocktail);

    return await newCocktail.save();
  }

  async getDefault(): Promise<IDefaultCocktails> {
    const owner = process.env.OWNER;
    const cocktails: Cocktail[] = await this.cocktailModel
      .find({ owner })
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');
    const ingredients: ShopingList = await this.IngredientListModel.findOne({
      owner,
    });

    const favorite: Favorite = await this.FavoriteService.getAll({ owner });
    const result: IDefaultCocktails = filterDefault(
      cocktails,
      ingredients,
      favorite,
    );
    return result;
  }

  async getMyDefault({ owner }): Promise<IDefaultCocktails> {
    const defaultOwner = process.env.OWNER;
    const cocktails: Cocktail[] = await this.cocktailModel
      .find({ owner: defaultOwner })
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');
    const ingredients: IngredientList = await this.IngredientListModel.findOne({
      owner: defaultOwner,
    });

    const favorite: Favorite = await this.FavoriteService.getAll({ owner });
    const result: IDefaultCocktails = filterDefault(
      cocktails,
      ingredients,
      favorite,
    );
    return result;
  }

  async getMyCocktails({ owner }): Promise<IMyCocktails> {
    const cocktails: Cocktail[] = await this.cocktailModel
      .find({ owner })
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');

    const ingredients: IngredientList[] =
      await this.IngredientListModel.findOne({
        owner,
      });

    const favorite: Favorite = await this.FavoriteService.getAll({ owner });

    const myObj = filterMy(cocktails, ingredients, favorite);
    const defaultObj = await this.getMyDefault({ owner });
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

  async getById({ id, owner }): Promise<Cocktail> {
    try {
      const cocktail: Cocktail = await this.cocktailModel
        .findById(id)
        .populate('ingredients.data', ['id', 'title', 'description', 'image'])
        .populate('glass')
        .populate('ingredients.alternatives');

      const ingredients = await this.IngredientListModel.findOne({
        owner,
      });

      const favorite = await this.FavoriteService.getAll({ owner });

      const result = addFavoriteAndICan(cocktail, ingredients, favorite);
      return result;
    } catch (error) {
      errorGenerator('Wrong ID , ingredient not found', 'NOT_FOUND');
    }
  }

  async deleteMy({ userId, id }): Promise<void> {
    await this.cocktailModel.findOneAndDelete({ owner: userId, id });
  }

  async findByIngredient({ id }): Promise<Cocktail[]> {
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
