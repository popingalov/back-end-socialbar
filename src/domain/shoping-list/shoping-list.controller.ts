import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ShopingListService } from './shoping-list.service';
import { ShopingList } from './schema/shoping-list.schema';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { JwtPublickGuard } from '../auth/strategies/publick.guard';
import { IdDto } from 'src/globalDto/id.dto';

@Controller('shoping-list')
export class ShopingListController {
  constructor(private readonly shopingListService: ShopingListService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: IdDto, @Req() req) {
    const { id } = body;
    return this.shopingListService.createShopingItem({
      id,
      owner: req.user.id,
    });
  }

  @UseGuards(JwtPublickGuard)
  @Get()
  getAll(@Req() req): Promise<ShopingList> {
    return this.shopingListService.getAll({
      owner: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param() { id }: IdDto, @Req() req): Promise<void> {
    const owner = req.user.id;
    return this.shopingListService.deleteItem({ id, owner });
  }
}
