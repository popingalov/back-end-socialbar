import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Glass, GlassDocument } from './schema/glasses.schema';

@Injectable()
export class GlassesService {
  constructor(
    @InjectModel(Glass.name) private readonly glassModel: Model<GlassDocument>,
  ) {}

  async getAll(): Promise<Glass[]> {
    try {
      return await this.glassModel.find();
    } catch (error) {
      throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async createOne(glass): Promise<Glass> {
    try {
      const newGlass = new this.glassModel(glass);
      return newGlass.save();
    } catch (error) {
      throw new HttpException(
        'Impossible to create a New Glass',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }
}
