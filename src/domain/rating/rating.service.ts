import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingDto } from './dto/get-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating, RatingDocument } from './schema/rating.schema';
import { Cocktail, CocktailDocument } from '../cocktails/cocktails.schema';
import { ratingSwitcher, ratingWordSwitcher } from 'src/helpers/ratingSwitcher';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
  ) {}

  async postRating({ id, owner, rating }: CreateRatingDto) {
    const cocktailRating = await this.cocktailModel.findOne({ id }, 'ratings');
    console.log(cocktailRating);

    const value = ratingSwitcher(rating);
    const ratingValue = cocktailRating.ratings[value];
    console.log(ratingValue);
    const valueUpdate = ratingWordSwitcher(value, ratingValue);
    console.log(valueUpdate);

    const a = await this.cocktailModel.findByIdAndUpdate(
      id,
      { ratings: valueUpdate },
      {
        new: true,
      },
    );
    console.log(a);

    const existItem = await this.ratingModel.find({
      owner,
      cocktailId: id,
    });

    if (existItem.length > 0) {
      return await this.updateRating({ id, owner, rating });
    }

    const newRating = new this.ratingModel({
      owner,
      cocktailId: id,
      rating,
    });

    // ? Rating Update
    //const cocktailRating = await this.cocktailModel.findOne({ id }, 'ratings');
    //
    //const value = ratingSwitcher(rating);
    //const ratingValue = cocktailRating.ratings[value];
    //const valueUpdate = ratingWordSwitcher(value, ratingValue)
    //
    //await this.cocktailModel.findByIdAndUpdate(
    //  id,
    //  { raitings: valueUpdate },
    //  {
    //    new: true,
    //  },
    //);

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

    if (!updateItem) {
      return 'No items';
    }
  }
}
