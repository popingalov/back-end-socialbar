import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingDto } from './dto/get-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating, RatingDocument } from './schema/rating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
  ) {}

  postRating({ id, owner, rating }: CreateRatingDto) {
    return 'This action adds a new rating';
  }

  findOne({ id }: GetRatingDto) {
    return `This action returns a #${id} rating`;
  }

  updateRating({ id, owner, rating }: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }
}
