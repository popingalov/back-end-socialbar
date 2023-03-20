import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import addLacks from 'src/helpers/addLacks';
import {
  IngredientList,
  IngredientListDocument,
} from '../ingredient-list/schema/ingredientList.schema';
import { GetFavoriteDtoMail } from './dto/get-favorite.dto';
import { Favorite, FavoriteDocument } from './shema/favorite.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoritetModel: Model<FavoriteDocument>,
    @InjectModel(IngredientList.name)
    private readonly ingredientList: Model<IngredientListDocument>,
  ) {}

  async createFavorite({ owner, id }) {
    const userItems: Favorite = await this.favoritetModel.findOne({
      owner,
    });

    if (!userItems) {
      const newItem = await this.favoritetModel.create({
        owner,
        cocktails: [id],
      });
      return newItem;
    }

    const findItem = userItems.cocktails.find(
      (elem) => elem.toString() === id.toString(),
    );

    if (!findItem) {
      const newItem = await this.favoritetModel
        .findOneAndUpdate(
          { owner },
          {
            $push: { cocktails: id },
          },
          { new: true },
        )
        .populate('cocktails');
      return newItem;
    } else {
      return userItems;
    }
  }

  async getAll({ owner, lang }): Promise<Favorite> {
    const [favorite, ingredientList] = await Promise.all([
      await this.favoritetModel
        .findOne({ owner })
        .populate('cocktails', '-owner'),
      //.populate(`cocktails.${lang}.ingredients.data`),
      this.ingredientList.findOne({ owner }).populate('list'),
    ]);

    const result: any = addLacks({ favorite, ingredientList, lang });
    console.log('RESULT', result);
    return result;
  }

  async getAllForMail({ email }: GetFavoriteDtoMail): Promise<Favorite> {
    const favoriteList = await this.favoritetModel
      .findOne({ email })
      .populate('cocktails owner');

    return favoriteList;
  }

  async deleteFavorite({ id, owner }): Promise<void> {
    await this.favoritetModel.updateOne(
      {
        owner,
      },
      { $pull: { cocktails: id } },
    );
  }
}
