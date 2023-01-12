import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopingList, ShopingListDocument } from './schema/shoping-list.schema';

@Injectable()
export class ShopingListService {
  constructor(
    @InjectModel(ShopingList.name)
    private readonly shopingListModel: Model<ShopingListDocument>,
  ) {}

  async createShopingItem({ owner, id }) {
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
  }

  async getAll({ owner }): Promise<ShopingList> {
    const itemsList = await this.shopingListModel
      .findOne({ owner })
      .populate('ingredients');
    return itemsList;
  }

  async deleteItem({ id, owner }): Promise<void> {
    await this.shopingListModel.updateOne(
      {
        owner,
      },
      { $pull: { ingredients: id } },
    );
  }
}
