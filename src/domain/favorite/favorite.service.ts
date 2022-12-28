import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { GetFavoriteDto } from './dto/get-favorite.dto';
import { Favorite, FavoriteDocument } from './shema/favorite.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoritetModel: Model<FavoriteDocument>,
  ) {}

  async createFavorite({ owner, id }: CreateFavoriteDto) {
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

    const findItem = userItems.cocktails.find((elem) => elem.toString() === id);

    if (!findItem) {
      const newItem = await this.favoritetModel.updateOne(
        { owner },
        {
          $push: { cocktails: id },
        },
      );
      return newItem;
    } else {
      return userItems;
    }
  }

  async getAll({ owner }: GetFavoriteDto): Promise<Favorite[]> {
    const favoriteList = await this.favoritetModel.find({ owner });
    return favoriteList;
  }

<<<<<<< Updated upstream
  async deleteFavorite(id: string): Promise<void> {
    const delItem = await this.favoritetModel.find({
      id,
    });
    const newItems = delItem[0].cocktails.filter(
      (elem) => elem.toString() !== id,
    );
    await this.favoritetModel.findOneAndUpdate(
      { id },
      { cocktails: [...newItems] },
=======
  async deleteFavorite(id: string, owner: string): Promise<void> {
    await this.favoritetModel.updateOne(
      {
        owner,
      },
      { $pull: { cocktails: id } },
>>>>>>> Stashed changes
    );
  }
}
