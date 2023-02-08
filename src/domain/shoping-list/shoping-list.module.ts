import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopingListService } from './shoping-list.service';
import { ShopingListController } from './shoping-list.controller';
import { ShopingList, ShopingListSchema } from './schema/shoping-list.schema';

@Module({
  controllers: [ShopingListController],
  providers: [ShopingListService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ShopingList.name,
        schema: ShopingListSchema,
      },
    ]),
  ],
})
export class ShopingListModule {}
