import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ratingAdditionCalculation from '../../helpers/ratingsFunc/ratingAdditionCalculation';
import ratingUpdateCalculation from 'src/helpers/ratingsFunc/ratingUpdateCalculation';

import { Rating, RatingDocument } from './schema/rating.schema';
import {
  Cocktail,
  CocktailDocument,
} from '../cocktails/shame/cocktails.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
  ) {}

  async postRating({ id, owner, rating }) {
    try {
      const findCocktail = await this.cocktailModel.findOne(
        { _id: id },
        'en.ratings',
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

      await this.cocktailModel.findOneAndUpdate(
        { _id: id },
        {
          en: { ratings: { ...updateData, ...countValue } },
          ua: { ratings: { ...updateData, ...countValue } },
          ru: { ratings: { ...updateData, ...countValue } },
        },
        { new: true },
      );

      return await newRating.save();
    } catch (error) {
      throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne({ id }) {
    const findCocktail = await this.cocktailModel.findOne(
      { _id: id },
      'en.ratings',
    );

    if (findCocktail) {
      const { average } = findCocktail.en.ratings;
      return average;
    }
    throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
  }

  async updateRating({ id, owner, rating }) {
    try {
      const updateItem = await this.ratingModel.findOneAndUpdate(
        { owner, cocktailId: id },
        { rating },
      );
      if (!updateItem) throw Error;
      if (updateItem.rating === rating) return rating;

      // ? Update Ratings in Cocktails object
      const findCocktail = await this.cocktailModel.findOne(
        { _id: id },
        'en.ratings',
      );

      const { updateData, countValue } = ratingUpdateCalculation(
        findCocktail,
        updateItem.rating,
        rating,
      );
      const newRaiting = await this.cocktailModel.findOneAndUpdate(
        { _id: id },
        {
          en: { ratings: { ...updateData, ...countValue } },
          ua: { ratings: { ...updateData, ...countValue } },
          ru: { ratings: { ...updateData, ...countValue } },
        },
        { new: true },
      );

      return newRaiting.en.ratings;
    } catch (error) {
      throw new HttpException('Item Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
