import {
  Controller,
  Get,
  Post,
  Res,
  Put,
  Delete,
  Body,
  Req,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { CocktailsService } from './cocktails.service';
import { Cocktail } from './shame/cocktails.schema';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { JwtPublickGuard } from '../auth/strategies/publick.guard';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { IDefaultCocktails } from './dto/returnDefaultCocktails.dto';
import { IMyCocktails } from './dto/returnMyCocktails.dto';
import { IdDto } from 'src/globalDto/id.dto';
// ? Upload Files
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailService: CocktailsService) {}

  // async getDefault(@Req() req): Promise<IDefaultCocktails> {
  //   return await this.cocktailService.getDefault();
  // }

  @UseGuards(JwtPublickGuard)
  @Get()
  async getAll(@Req() req): Promise<IDefaultCocktails | IMyCocktails> {
    const { id, trigger } = req.user;
    if (trigger) {
      return await this.cocktailService.getDefault();
    }
    return await this.cocktailService.getMyCocktails({
      owner: id,
    });
  }

  // @Post('/my')
  @UseGuards(JwtAuthGuard)
  async getMyCocktails(@Req() req): Promise<IMyCocktails> {
    const { id } = req.user;
    return await this.cocktailService.getMyCocktails({
      owner: id,
    });
  }
  @UseGuards(JwtPublickGuard)
  @Get(':id')
  async getOne(@Param() { id }: IdDto, @Req() req): Promise<Cocktail> {
    const owner = req.user.id;

    return await this.cocktailService.getById({ id, owner });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async createCocktail(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateCocktailDto,
    @Req() req,
  ): Promise<Cocktail> {
    const { id } = req.user;

    const imageUploadLink = await this.cocktailService.uploadImage(
      image.buffer,
      image.originalname,
    );
    return await this.cocktailService.createOne({
      ...body,
      picture: imageUploadLink.Location,
      owner: id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param() { id }: IdDto, @Req() req): Promise<void> {
    const userId = req.user.id;
    return this.cocktailService.deleteMy({ userId, id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(
    @Body() cocktail: UpdateCocktailDto,
    @Param() { id }: IdDto,
  ): Promise<Cocktail> {
    return await this.cocktailService.updateOne(id, cocktail);
  }

  // ! test controller
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('img'))
  async testUpload(@UploadedFile() image: Express.Multer.File) {
    return await this.cocktailService.uploadImage(
      image.buffer,
      image.originalname,
    );
  }
}
