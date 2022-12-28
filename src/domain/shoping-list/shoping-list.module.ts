import { Module } from '@nestjs/common';
import { ShopingListService } from './shoping-list.service';
import { ShopingListController } from './shoping-list.controller';

@Module({
  controllers: [ShopingListController],
  providers: [ShopingListService]
})
export class ShopingListModule {}
