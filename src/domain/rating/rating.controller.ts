import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { RatingService } from './rating.service';

import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { IdDto } from 'src/globalDto/id.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(@Param() { id }: IdDto, @Req() req, @Body() body: CreateRatingDto) {
    try {
      const owner = req.user.id;
      const { rating } = body;
      return this.ratingService.postRating({ id, owner, rating });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    try {
      return this.ratingService.findOne({ id });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param() { id }: IdDto, @Req() req, @Body() body: UpdateRatingDto) {
    try {
      const owner = req.user.id;
      const { rating } = body;
      return this.ratingService.updateRating({ id, owner, rating });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
