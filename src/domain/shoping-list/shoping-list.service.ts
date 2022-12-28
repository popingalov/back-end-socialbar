import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShopingListDto } from './dto/create-shoping-list.dto';
import { ShopingList, ShopingListDocument } from './schema/shoping-list.schema';

@Injectable()
export class ShopingListService {
  constructor(
    @InjectModel(ShopingList.name)
    private readonly shopingListModel: Model<ShopingListDocument>,
  ) {}

  async createShopingItem({ owner, id }: CreateShopingListDto) {
    const userItems: any = await this.shopingListModel.findOne({
      owner,
    });

    if (!userItems) {
      console.log('CREATE');
      const newItem = await this.shopingListModel.create({
        owner,
        cocktails: [id],
      });

      return newItem;
    } else {
      console.log('UPDATE');
      const newItem = await this.shopingListModel.updateOne(
        { owner },
        {
          $push: { cocktails: id },
        },
      );
      return newItem;
    }
  }

  async getAll(): Promise<ShopingList[]> {
    return await this.shopingListModel.find();
  }

  async deleteItem(id: string): Promise<void> {
    await this.shopingListModel.findOneAndDelete({ id });
  }
}
