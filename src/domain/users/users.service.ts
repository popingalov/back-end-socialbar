import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UsersDocument } from './schemas/users.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserIdDto } from './dto/get-user-id.dto';
import { findOneUserDto } from './dto/find-one-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import {
  IngredientList,
  IngredientListDocument,
} from '../ingredient-list/schema/ingredientList.schema';
import { Favorite, FavoriteDocument } from '../favorite/shema/favorite.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
    @InjectModel(IngredientList.name)
    private ingredientList: Model<IngredientListDocument>,
    @InjectModel(Favorite.name)
    private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async createNewUser(user: CreateUserDto): Promise<User> {
    const createdUser = await new this.userModel(user);
    const defaultList = await this.ingredientList.findOne(
      { owner: process.env.OWNER },
      '-owner',
    );

    this.ingredientList.create({
      owner: createdUser.id,
      list: defaultList.list,
    });

    const defaultFavorite = await this.favoriteModel.findOne(
      { owner: process.env.OWNER },
      '-owner',
    );

    this.favoriteModel.create({
      owner: createdUser.id,
      cocktails: defaultFavorite.cocktails,
    });

    return createdUser.save();
  }

  async getById({ id }: GetUserIdDto): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findByQuery(query: findOneUserDto): Promise<User> {
    return await this.userModel.findOne({ ...query });
  }

  async updateUser({ id, payload }: updateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
    });
  }
}
