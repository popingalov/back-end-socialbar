import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User, UserSchema } from './schemas/users.schema';
import {
  IngredientList,
  IngredientListSchema,
} from '../ingredient-list/schema/ingredientList.schema';
import { Favorite, FavoriteSchema } from '../favorite/shema/favorite.schema';
import {
  ShopingList,
  ShopingListSchema,
} from '../shoping-list/schema/shoping-list.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: IngredientList.name,
        schema: IngredientListSchema,
      },
      {
        name: ShopingList.name,
        schema: ShopingListSchema,
      },
      {
        name: Favorite.name,
        schema: FavoriteSchema,
      },
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
