import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Req,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { IngredientsService } from './ingredients.service';
import { Ingredient } from './schema/ingredients.schema';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { JwtPublickGuard } from '../auth/strategies/publick.guard';

import { CreateIngredientDto } from './dto/create-ingredient-dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { IdDto } from 'src/globalDto/id.dto';
// ? image
import { CocktailsService } from '../cocktails/cocktails.service';
import IFileUpload from 'src/helpers/imageHeplers/fileUpload.interface';
import fileUpload from 'src/helpers/imageHeplers/fileUpload';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ingredients2')
export class IngredientsController {
  constructor(
    private readonly ingredientsService: IngredientsService,
    private readonly cocktailsService: CocktailsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async createIngredient(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateIngredientDto,
    @Req() req,
  ): Promise<Ingredient> {
    const { id } = req.user;
    let imageUploadLink: IFileUpload = await fileUpload(
      image,
      this.cocktailsService.uploadImage,
    );

    return await this.ingredientsService.createIngredient(
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

  @UseGuards(JwtPublickGuard)
  @Get()
  async getDefault(@Req() req): Promise<Ingredient[]> {
    const { lang } = req.query;
    const owner = req.user.id;
    return await this.ingredientsService.getDefault({ owner, lang });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  async getIngredients(@Req() req): Promise<Ingredient[]> {
    const { lang } = req.query;
    return await this.ingredientsService.getIngredients({
      owner: req.user.id,
      lang,
    });
  }

  @Get(':id')
  async getById(@Param() { id }: IdDto, @Req() req) {
    const { lang } = req.query;
    return await this.ingredientsService.getIngredientById({ id, lang });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param() { id }: IdDto, @Req() req): Promise<void> {
    const owner = req.user.id;
    return this.ingredientsService.deleteIngredient({ id, owner });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('picture'))
  async updateOne(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: UpdateIngredientDto,
    @Param() { id }: IdDto,
    @Req() req,
  ): Promise<Ingredient> {
    const { lang } = req.query;
    let imageUploadLink: IFileUpload = await fileUpload(
      image,
      this.cocktailsService.uploadImage,
    );

    return await this.ingredientsService.updateIngredient(
      id,
      lang,
      imageUploadLink
        ? {
            ...body,
            picture: imageUploadLink.Location,
          }
        : body,
    );
  }
}
