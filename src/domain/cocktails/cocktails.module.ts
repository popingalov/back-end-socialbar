import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';

import {
  Cocktail,
  CocktailSchema,
  // CocktailIngredients,
  // CocktailIngredientsSchema,
} from './cocktails.schema';

@Module({
  controllers: [CocktailsController],
  providers: [CocktailsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Cocktail.name,
        schema: CocktailSchema,
      },
    ]),
  ],
  exports: [CocktailsService],
})
export class CocktailsModule {}
