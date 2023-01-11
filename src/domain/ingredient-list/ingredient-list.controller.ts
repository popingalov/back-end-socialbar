import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IngredientListService } from './ingredient-list.service';
import { JwtPublickGuard } from '../auth/strategies/publick.guard';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { IdDto } from 'src/globalDto/id.dto';

@Controller('my-ingredient-list')
export class IngredientListController {
  constructor(private readonly ingredientListService: IngredientListService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body, @Req() req) {
    return this.ingredientListService.create({
      owner: req.user.id,
      id: body.id,
    });
  }

  @UseGuards(JwtPublickGuard)
  @Get()
  findAll(@Req() req) {
    return this.ingredientListService.getAll({ owner: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param() { id }: IdDto) {
    return this.ingredientListService.remove({
      owner: req.user.id,
      id,
    });
  }
}
