import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cocktail, CocktailDocument } from './cocktails.schema';

import { CreateCocktailDto } from './dto/create-cocktail.dto';
import { FindByIdDto } from './dto/find-by-id.dto';
import { FindByIngredientDto } from './dto/find-by-ingredient.dto';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
  ) {}

  async createOne(cocktail: CreateCocktailDto): Promise<Cocktail> {
    const newCocktail = new this.cocktailModel(cocktail);

    return await newCocktail.save();
  }

  async getAll(): Promise<Cocktail[]> {
    const cocktails = await this.cocktailModel
      .find()
      .populate('owner', ['id', 'email', 'name', 'picture'])
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');

    return cocktails;
  }

  async getByQuery(query): Promise<Cocktail[]> {
    return await this.cocktailModel.find({ query });
  }

  async getById({ id }: FindByIdDto): Promise<Cocktail> {
    return await this.cocktailModel.findById(id);
  }

  async findByIngredient({ id }: FindByIngredientDto): Promise<Cocktail[]> {
    return await this.cocktailModel.find({ 'ingredients.data': id });
  }
}