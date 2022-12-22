import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UsersDocument } from './schemas/users.schema';

import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { findUserIdDto } from './dto/find-user-id.dto';
import { findOneUserDto } from './dto/find-one-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async createNew(user: createUserDto): Promise<User> {
    const createdUser = new this.userModel(user);

    return await createdUser.save();
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
