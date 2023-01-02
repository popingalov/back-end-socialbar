import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';

import { Cocktail, CocktailSchema } from './cocktails.schema';
import {
  IngredientList,
  IngredientListSchema,
} from '../ingredient-list/schema/ingredientList.schema';
@Module({
  controllers: [CocktailsController],
  providers: [CocktailsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Cocktail.name,
        schema: CocktailSchema,
      },
      {
        name: IngredientList.name,
        schema: IngredientListSchema,
      },
    ]),
  ],
  exports: [CocktailsService],
})
export class CocktailsModule {}
