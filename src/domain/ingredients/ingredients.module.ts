import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { Ingredient, IngredientSchema } from './ingredients.schema';

import { CocktailsModule } from 'domain/cocktails/cocktails.module';

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
    ]),
  ],
})
export class IngredientsModule {}
