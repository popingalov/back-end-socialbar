import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GlassesController } from './glasses.controller';
import { GlassesService } from './glasses.service';

import { Glass, GlassSchema } from './schema/glasses.schema';

@Module({
  controllers: [GlassesController],
  providers: [GlassesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Glass.name,
        schema: GlassSchema,
      },
    ]),
  ],
})
export class GlassesModule {}
