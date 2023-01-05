import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating, RatingSchema } from './schema/rating.schema';
import { Cocktail, CocktailSchema } from '../cocktails/cocktails.schema';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: RatingSchema,
      },
      {
        name: Cocktail.name,
        schema: CocktailSchema,
      },
    ]),
  ],
})
export class RatingModule {}
