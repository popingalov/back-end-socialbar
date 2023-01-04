import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopingListDto } from './dto/create-shoping-list.dto';
import { GetShopingListDto } from './dto/get-shoping-list.dto';
import { ShopingList, ShopingListDocument } from './schema/shoping-list.schema';

@Injectable()
export class ShopingListService {
  constructor(
    @InjectModel(ShopingList.name)
    private readonly shopingListModel: Model<ShopingListDocument>,
  ) {}

  async createShopingItem({ owner, id }: CreateShopingListDto) {
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
      (elem) => elem.toString() === id,
    );

    if (!findItem) {
      const newItem = await this.shopingListModel.updateOne(
        { owner },
        {
          $push: { ingredients: id },
        },
      );
      return newItem;
    } else {
      return userItems;
    }
  }

  async getAll({ owner }: GetShopingListDto): Promise<ShopingList> {
    const itemsList = await this.shopingListModel
      .findOne({ owner })
      .populate('ingredients owner');
    return itemsList;
  }

  async deleteItem(id: string, owner: string): Promise<void> {
    await this.shopingListModel.updateOne(
      {
        owner,
      },
      { $pull: { ingredients: id } },
    );
  }
}
