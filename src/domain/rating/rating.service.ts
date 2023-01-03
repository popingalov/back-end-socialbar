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
    const existItem = await this.ratingModel.find({
      owner,
      cocktailId: id,
    });

    if (existItem) {
      return await this.updateRating({ id, owner, rating });
    }

    const newRating = new this.ratingModel({
      owner,
      cocktailId: id,
      rating,
    });

    return await newRating.save();
  }

  async findOne({ id }: GetRatingDto) {
    const findCocktail = await this.ratingModel.find({ cocktailId: id });

    if (findCocktail) {
      let users = 0;
      const sumRaiting = findCocktail.reduce((prev, number) => {
        users += 1;
        return prev + number.rating;
      }, 0);
      return sumRaiting / users;
    }
    return `No items`;
  }

  async updateRating({ id, owner, rating }: UpdateRatingDto) {
    const updateItem = await this.ratingModel.findOneAndUpdate(
      { owner, cocktailId: id },
      { rating },
      { new: true },
    );

    console.log(updateItem);
    if (!updateItem) {
      return 'No items';
    }
  }
}
