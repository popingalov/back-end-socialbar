import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopingListService } from './shoping-list.service';
import { ShopingListController } from './shoping-list.controller';
import { ShopingList, ShopingListSchema } from './schema/shoping-list.schema';
import {
  Ingredient,
  IngredientSchema,
} from '../ingredients/schema/ingredients.schema';

@Module({
  controllers: [ShopingListController],
  providers: [ShopingListService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ShopingList.name,
        schema: ShopingListSchema,
      },
      {
        name: Ingredient.name,
        schema: IngredientSchema,
      },
    ]),
  ],
})
export class ShopingListModule {}
