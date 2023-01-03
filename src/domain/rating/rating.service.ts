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

  async postRating({ id, owner, rating }: CreateRatingDto) {
    const newRating = new this.ratingModel({
      owner,
      cocktailId: id,
      rating,
    });

    return await newRating.save();
  }

  async findOne({ id }: GetRatingDto) {
    const findCocktail = await this.ratingModel.find({ cocktailId: id });
    console.log(findCocktail);

    if (findCocktail) {
      let users;
      const sumRaiting = findCocktail.reduce((prev, number) => {
        users += 1;
        return prev + number.rating;
      }, 0);
      return sumRaiting / users;
    }
    return `No items`;
  }

  async updateRating({ id, owner, rating }: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }
}
