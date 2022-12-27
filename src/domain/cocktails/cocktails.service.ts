import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cocktail, CocktailDocument } from './cocktails.schema';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
import { Types } from 'mongoose';
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

  async getDefault(): Promise<Cocktail[]> {
    const cocktails = await this.cocktailModel
      .find({ email: 'popingalov@gmail.com' })
      // .populate('owner', ['id', 'email', 'name', 'picture'])
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');

    return cocktails;
  }

  async getMyCocktails(query): Promise<Cocktail[]> {
    return await this.cocktailModel
      .find({ query })
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');
  }

  async getById({ id }: FindByIdDto): Promise<Cocktail> {
    return await this.cocktailModel
      .findById(id)
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');
  }

  async deleteMy({ userId, id }): Promise<void> {
    await this.cocktailModel.findOneAndDelete({ owner: userId, id });
  }

  async findByIngredient({ id }: FindByIngredientDto): Promise<Cocktail[]> {
    return await this.cocktailModel.find({ 'ingredients.data': id });
  }

  async updateOne(
    id: Types.ObjectId,
    cocktail: UpdateCocktailDto,
  ): Promise<Cocktail> {
    const { title, description } = cocktail;
    const updateCocktail = this.cocktailModel.findByIdAndUpdate(
      id,
      { title, description },
      {
        new: true,
      },
    );

    return await updateCocktail;
  }
}
