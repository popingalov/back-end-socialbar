import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';

import { Cocktail, CocktailSchema } from './cocktails.schema';
import { PublickModule } from '../publick/publick.module';

@Module({
  controllers: [CocktailsController],
  providers: [CocktailsService],
  imports: [
    PublickModule,
    MongooseModule.forFeature([
      {
        name: Cocktail.name,
        schema: CocktailSchema,
      },
    ]),
  ],
  exports: [CocktailsService],
})
export class CocktailsModule {}
