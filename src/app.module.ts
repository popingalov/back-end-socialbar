import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from 'domain/auth/auth.module';
import { UsersModule } from 'domain/users/users.module';
import { CocktailsModule } from 'domain/cocktails/cocktails.module';
import { IngredientsModule } from 'domain/ingredients/ingredients.module';
import { GlassesModule } from './domain/glasses/glasses.module';
import { ConfigModule } from '@nestjs/config';

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
    // AuthModule,
    CocktailsModule,
    IngredientsModule,
    GlassesModule,
  ],
})
export class AppModule {}
