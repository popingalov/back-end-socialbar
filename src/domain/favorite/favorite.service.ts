import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './favorite.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private readonly favoriteModel: Model<FavoriteDocument>,
  ) {}

  async postFavorite(id): Promise<Favorite> {
    const newFavorite = new this.favoriteModel(id);
    return await newFavorite.save();
  }

  async getFavorites(): Promise<Favorite[]> {
    return await this.favoriteModel.find();
  }

  removeFavorite(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
