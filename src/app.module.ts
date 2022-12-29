import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { CocktailsModule } from './domain/cocktails/cocktails.module';
import { IngredientsModule } from './domain/ingredients/ingredients.module';
import { GlassesModule } from './domain/glasses/glasses.module';

import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './domain/categories/categories.module';
import { FavoriteModule } from './domain/favorite/favorite.module';
import { ShopingListModule } from './domain/shoping-list/shoping-list.module';
import { IngredientListModule } from './domain/ingredient-list/ingredient-list.module';

const DB_HOST =
  'mongodb+srv://popingalov:popingalov@cluster0.gdfjo81.mongodb.net/db-bar?retryWrites=true&w=majority';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(DB_HOST),
    PassportModule.register({ session: true }),
    UsersModule,
    AuthModule,
    CocktailsModule,
    IngredientsModule,
    GlassesModule,
    CategoriesModule,
    FavoriteModule,
    ShopingListModule,
    IngredientListModule,
  ],
})
export class AppModule {}
