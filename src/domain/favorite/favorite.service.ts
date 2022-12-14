import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFavoriteDtoMail } from './dto/get-favorite.dto';
import { Favorite, FavoriteDocument } from './shema/favorite.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoritetModel: Model<FavoriteDocument>,
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

  async getAll({ owner }): Promise<Favorite> {
    const favoriteList = await this.favoritetModel
      .findOne({ owner })
      .populate('cocktails');

    return favoriteList;
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
