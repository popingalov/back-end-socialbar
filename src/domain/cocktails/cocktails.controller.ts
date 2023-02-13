import {
  Controller,
  Get,
  Post,
  Res,
  Put,
  Patch,
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
import IFileUpload from 'src/helpers/imageHeplers/fileUpload.interface';
import fileUpload from 'src/helpers/imageHeplers/fileUpload';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailService: CocktailsService) {}

  @UseGuards(JwtPublickGuard)
  @Get()
  async getAll(@Req() req): Promise<IDefaultCocktails | IMyCocktails> {
    const { id, trigger } = req.user;
    const { lang } = req.query;

    if (trigger) {
      return await this.cocktailService.getDefault({ lang });
    }
    return await this.cocktailService.getMyCocktails({
      owner: id,
      lang,
    });
  }

  // @Post('/my')
  @UseGuards(JwtAuthGuard)
  async getMyCocktails(@Req() req): Promise<IMyCocktails> {
    const { id } = req.user;
    const { lang } = req.query;
    return await this.cocktailService.getMyCocktails({
      owner: id,
      lang,
    });
  }

  @UseGuards(JwtPublickGuard)
  @Get(':id')
  async getOne(@Param() { id }: IdDto, @Req() req): Promise<Cocktail> {
    const owner = req.user.id;
    const { lang } = req.query;
    return await this.cocktailService.getById({ id, owner, lang });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async createCocktail(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateCocktailDto,
    @Req() req,
  ): Promise<Cocktail> {
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
  @Patch(':id')
  async updateOne(
    @Body() cocktail: UpdateCocktailDto,
    @Param() { id }: IdDto,
    @Req() req,
  ): Promise<Cocktail> {
    const { lang } = req.query;
    return await this.cocktailService.updateOne(id, cocktail, lang);
  }

  // ! test controller
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('picture'))
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
