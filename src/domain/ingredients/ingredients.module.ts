import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { Ingredient, IngredientSchema } from './schema/ingredients.schema';

import { CocktailsModule } from '../cocktails/cocktails.module';
import {
  ShopingList,
  ShopingListSchema,
} from '../shoping-list/schema/shoping-list.schema';
import {
  IngredientList,
  IngredientListSchema,
} from '../ingredient-list/schema/ingredientList.schema';
@Module({
  providers: [IngredientsService],
  controllers: [IngredientsController],
  imports: [
    CocktailsModule,
    MongooseModule.forFeature([
      {
        name: Ingredient.name,
        schema: IngredientSchema,
      },
      {
        name: ShopingList.name,
        schema: ShopingListSchema,
      },
      {
        name: IngredientList.name,
        schema: IngredientListSchema,
      },
    ]),
  ],
})
export class IngredientsModule {}
