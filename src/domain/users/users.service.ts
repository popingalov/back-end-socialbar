import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UsersDocument } from './schemas/users.schema';

import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { findUserIdDto } from './dto/find-user-id.dto';
import { findOneUserDto } from './dto/find-one-user.dto';
import {
  IngredientList,
  IngredientListDocument,
} from '../ingredient-list/schema/ingredientList.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
    @InjectModel(IngredientList.name)
    private ingredientList: Model<IngredientListDocument>,
  ) {}

  async createNew(user: createUserDto): Promise<User> {
    const createdUser = await new this.userModel(user);
    const defaultList = await this.ingredientList.findOne(
      { owner: process.env.OWNER },
      '-owner',
    );

    this.ingredientList.create({ owner: createdUser.id, ...defaultList });
    return createdUser.save();
  }

  async findById({ id }: findUserIdDto): Promise<User> {
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
