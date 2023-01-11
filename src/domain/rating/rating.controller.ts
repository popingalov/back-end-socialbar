import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { RatingService } from './rating.service';
import { IdDto } from 'src/globalDto/id.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(@Param() { id }: IdDto, @Req() req, @Body() body) {
    const owner = req.user.id;
    const { rating } = body;
    return this.ratingService.postRating({ id, owner, rating });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.ratingService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param() { id }: IdDto, @Req() req, @Body() body) {
    const owner = req.user.id;
    const { rating } = body;
    return this.ratingService.updateRating({ id, owner, rating });
  }
}
