import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from 'domain/auth/auth.module';
import { UsersModule } from 'domain/users/users.module';
import { CocktailsModule } from 'domain/cocktails/cocktails.module';
import { IngredientsModule } from 'domain/ingredients/ingredients.module';
import { GlassesModule } from './domain/glasses/glasses.module';
import { CategoriesModule } from './domain/categories/categories.module';

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;
const DB_PARAMS = 'retryWrites=true&w=majority';
const DB_HOST =
  'mongodb+srv://popingalov:popingalov@cluster0.gdfjo81.mongodb.net/db-bar?retryWrites=true&w=majority';

@Module({
  controllers: [],
  providers: [],
  imports: [
    MongooseModule.forRoot(DB_HOST, {
      useNewUrlParser: true,
    }),
    PassportModule.register({ session: true }),
    UsersModule,
    // AuthModule,
    CocktailsModule,
    IngredientsModule,
    GlassesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
