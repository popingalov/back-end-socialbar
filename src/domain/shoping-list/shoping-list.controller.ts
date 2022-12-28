import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopingListService } from './shoping-list.service';
import { ShopingList } from './schema/shoping-list.schema';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('shoping-list')
export class ShopingListController {
  constructor(private readonly shopingListService: ShopingListService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body) {
    const { id, owner } = body;
    return this.shopingListService.createShopingItem({ id, owner });
  }

  @Get()
  getAll(): Promise<ShopingList[]> {
    return this.shopingListService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shopingListService.deleteItem(id);
  }
}
