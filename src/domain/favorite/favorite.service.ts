import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { TakeAllDto } from './dto/takeAll.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite, FavoriteDocument } from './schema/favorite.schema';
@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private readonly categoryModel: Model<FavoriteDocument>,
  ) {}

  async create({ owner, id }: CreateFavoriteDto) {
    const userItems: any = await this.categoryModel.findOne({
      owner,
    });

    if (!userItems) {
      const newItem = await this.categoryModel.create({
        owner,
        cocktails: [id],
      });

      return newItem;
    }

    const newItem = await this.categoryModel.findOneAndUpdate(
      { owner },
      {
        cocktails: [...userItems.cocktails, id],
      },
    );
    return newItem;
  }

  async findAll(owner: TakeAllDto) {
    const userItems: any = await this.categoryModel
      .findOne({ owner })
      .populate('cocktails');

    return userItems;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
