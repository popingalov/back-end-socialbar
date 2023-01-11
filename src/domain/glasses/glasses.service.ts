import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Glass, GlassDocument } from './schema/glasses.schema';
import { CreateGlassDto } from './dto/create-glass.dto';

@Injectable()
export class GlassesService {
  constructor(
    @InjectModel(Glass.name) private readonly glassModel: Model<GlassDocument>,
  ) {}

  async getAll(): Promise<Glass[]> {
    return await this.glassModel.find();
  }

  async createOne(glass: CreateGlassDto): Promise<Glass> {
    const newGlass = new this.glassModel(glass);

    return newGlass.save();
  }
}
