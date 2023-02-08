import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CocktailsController2 } from './cocktails.controller';
import { CocktailsService2 } from './cocktails.service';
import { Cocktail2, CocktailSchema } from './shame/cocktails.schema';
//
import { FavoriteModule } from '../favorite/favorite.module';
import {
  IngredientList,
  IngredientListSchema,
} from '../ingredient-list/schema/ingredientList.schema';
//
@Module({
  controllers: [CocktailsController2],
  providers: [CocktailsService2],
  imports: [
    FavoriteModule,
    MongooseModule.forFeature([
      {
        name: Cocktail2.name,
        schema: CocktailSchema,
      },
      {
        name: IngredientList.name,
        schema: IngredientListSchema,
      },
    ]),
  ],
  exports: [CocktailsService2],
})
export class CocktailsModule2 {}
