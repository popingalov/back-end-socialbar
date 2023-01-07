import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ratingAdditionCalculation from '../../helpers/ratingsFunc/ratingAdditionCalculation';
import ratingUpdateCalculation from 'src/helpers/ratingsFunc/ratingUpdateCalculation';

import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingDto } from './dto/get-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating, RatingDocument } from './schema/rating.schema';
import { Cocktail, CocktailDocument } from '../cocktails/cocktails.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
  ) {}

  async postRating({ id, owner, rating }: CreateRatingDto) {
    const findCocktail = await this.cocktailModel.findOne(
      { _id: id },
      'ratings',
    );

    // ? For update
    const existItem = await this.ratingModel.find({
      owner,
      cocktailId: id,
    });

    if (existItem.length > 0) {
      return await this.updateRating({ id, owner, rating });
    }

    // ? For create
    const newRating = new this.ratingModel({
      owner,
      cocktailId: id,
      rating,
    });

    // * Add Ratings in Cocktails object
    const { updateData, countValue } = ratingAdditionCalculation(
      findCocktail,
      rating,
    );
    const addCocktailsRatings = await this.cocktailModel.findOneAndUpdate(
      { _id: id },
      {
        ratings: { ...updateData, ...countValue },
      },
      { new: true },
    );
    console.log('ADD RESPONSE', addCocktailsRatings);

    return await newRating.save();
  }

  async findOne({ id }: GetRatingDto) {
    const findCocktail = await this.cocktailModel.findOne(
      { _id: id },
      'ratings',
    );

    if (findCocktail) {
      const { average } = findCocktail.ratings;
      return average;
    }
    return `No items`;
  }

  async updateRating({ id, owner, rating }: UpdateRatingDto) {
    const updateItem = await this.ratingModel.findOneAndUpdate(
      { owner, cocktailId: id },
      { rating },
    );

    if (!updateItem) {
      return 'No items';
    }

    // ? Update Ratings in Cocktails object
    console.log('???update???', id);
    const findCocktail = await this.cocktailModel.findOne(
      { _id: id },
      'ratings',
    );

    const { updateData, countValue } = ratingUpdateCalculation(
      findCocktail,
      updateItem.rating,
      rating,
    );
    const updateCocktailsRatings = await this.cocktailModel.findOneAndUpdate(
      { _id: id },
      {
        ratings: { ...updateData, ...countValue },
      },
      { new: true },
    );
    console.log('UPDATE RESPONSE', updateCocktailsRatings);
  }
}
