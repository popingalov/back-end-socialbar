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

import { CocktailsService2 } from './cocktails.service';
import { Cocktail2 } from './shame/cocktails.schema';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { JwtPublickGuard } from '../auth/strategies/publick.guard';
import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { IDefaultCocktails } from './dto/returnDefaultCocktails.dto';
import { IMyCocktails } from './dto/returnMyCocktails.dto';
import { IdDto } from 'src/globalDto/id.dto';
// ? Upload Files
import { FileInterceptor } from '@nestjs/platform-express';
import IFileUpload from 'src/helpers/imageHeplers/fileUpload.interface';
import fileUpload from 'src/helpers/imageHeplers/fileUpload';

@Controller('cocktails2')
export class CocktailsController2 {
  constructor(private readonly cocktailService: CocktailsService2) {}

  @UseGuards(JwtPublickGuard)
  @Get()
  async getAll(@Req() req): Promise<IDefaultCocktails | IMyCocktails> {
    const { id, trigger } = req.user;
    if (trigger) {
      console.log('trigger', trigger);
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
  async getOne(@Param() { id }: IdDto, @Req() req): Promise<Cocktail2> {
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
  ): Promise<Cocktail2> {
    // console.log('START');
    const { id } = req.user;
    let imageUploadLink: IFileUpload = await fileUpload(
      image,
      this.cocktailService.uploadImage,
    );

    return await this.cocktailService.createOne(
      imageUploadLink
        ? {
            ...body,
            picture: imageUploadLink.Location,
            owner: id,
          }
        : {
            ...body,
            owner: id,
          },
    );
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
  ): Promise<Cocktail2> {
    return await this.cocktailService.updateOne(id, cocktail);
  }

  // ! test controller
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('img'))
  async testUpload(@UploadedFile() image: Express.Multer.File, @Body() body) {
    const { picture } = body;
    await this.cocktailService.deleteImage(picture);

    let imageUploadLink: IFileUpload = await fileUpload(
      image,
      this.cocktailService.uploadImage,
    );
    return imageUploadLink;
  }
}
