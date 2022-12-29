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
import { CreateIngredientListDto } from './dto/create-ingredient-list.dto';
import { UpdateIngredientListDto } from './dto/update-ingredient-list.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('my-ingredient-list')
export class IngredientListController {
  constructor(private readonly ingredientListService: IngredientListService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateIngredientListDto, @Req() req) {
    return this.ingredientListService.create({
      owner: req.user.id,
      id: body.id,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.ingredientListService.findAll({ owner: req.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  remove(@Req() req, @Body() body) {
    return this.ingredientListService.remove({
      owner: req.user.id,
      id: body.id,
    });
  }
}
