import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopingList, ShopingListDocument } from './schema/shoping-list.schema';
import {
  Ingredient,
  IngredientDocument,
} from '../ingredients/schema/ingredients.schema';

@Injectable()
export class ShopingListService {
  constructor(
    @InjectModel(ShopingList.name)
    private readonly shopingListModel: Model<ShopingListDocument>,
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<IngredientDocument>,
  ) {}

  async createShopingItem({ owner, id }) {
    try {
      const ingredient = await this.ingredientModel.findById(id, 'en');
      if (!ingredient) throw Error;

      const userItems: ShopingList = await this.shopingListModel.findOne({
        owner,
      });

      if (!userItems) {
        const newItem = await this.shopingListModel.create({
          owner,
          ingredients: [id],
        });
        return newItem;
      }

      const findItem = userItems.ingredients.find(
        (elem) => elem.toString() === id.toString(),
      );

      if (!findItem) {
        const newItem = await this.shopingListModel
          .findOneAndUpdate(
            { owner },
            {
              $push: { ingredients: id },
            },
            { new: true },
          )
          .populate('ingredients');

        return newItem;
      } else {
        return userItems;
      }
    } catch (error) {
      throw new HttpException('Ingredient Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async getAll({ owner }): Promise<ShopingList> {
    try {
      const itemsList: any = await this.shopingListModel
        .findOne({ owner })
        .populate('ingredients')
        .lean();
      itemsList.ingredients = itemsList.ingredients.map((el) => {
        return el.en;
      });

      return itemsList;
    } catch (error) {
      throw new HttpException('Ingredient Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteItem({ id, owner }): Promise<void> {
    try {
      return await this.shopingListModel.findOneAndUpdate(
        {
          owner,
        },
        { $pull: { ingredients: id } },
        { new: true },
      );
    } catch (error) {
      throw new HttpException('Ingredient Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
