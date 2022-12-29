import { Module } from '@nestjs/common';
import { IngredientListService } from './ingredient-list.service';
import { IngredientListController } from './ingredient-list.controller';
import {
  IngredientList,
  IngredientListSchema,
} from './schema/ingredientList.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  controllers: [IngredientListController],
  providers: [IngredientListService],
  imports: [
    MongooseModule.forFeature([
      {
        name: IngredientList.name,
        schema: IngredientListSchema,
      },
    ]),
  ],
})
export class IngredientListModule {}
