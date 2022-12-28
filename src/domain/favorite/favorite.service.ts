import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite, FavoriteDocument } from './shema/favorite.schema';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoritetModel: Model<FavoriteDocument>,
  ) {}

  async createFavorite({ owner, id }: CreateFavoriteDto) {
    const userItems: any = await this.favoritetModel.findOne({
      owner,
    });

    if (!userItems) {
      console.log('CREATE');
      const newItem = await this.favoritetModel.create({
        owner,
        cocktails: [id],
      });

      return newItem;
    } else {
      console.log('UPDATE');
      const newItem = await this.favoritetModel.updateOne(
        { owner },
        {
          $push: { cocktails: id },
        },
      );
      return newItem;
    }
  }

  async getAll(): Promise<Favorite[]> {
    return await this.favoritetModel.find();
  }

  async deleteFavorite(id: string): Promise<void> {
    await this.favoritetModel.findOneAndDelete({ id });
  }
}
