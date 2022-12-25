import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ingredient, IngredientDocument } from './ingredients.schema';

import { CreateIngredientDto } from './dto/create-ingredient-dto';
import { GetIngredientByIdDto } from './dto/get-ingredient-by-id.dto';
import { CocktailsService } from '../cocktails/cocktails.service';
@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<IngredientDocument>,
    private readonly cocktailsService: CocktailsService,
  ) {}

  async createIngredient(ingredient: CreateIngredientDto): Promise<Ingredient> {
    const newIngredient = new this.ingredientModel(ingredient);

    return await newIngredient.save();
  }

  async getIngredientById({ id }: GetIngredientByIdDto) {
    const ingredient = await this.ingredientModel
      .findById(id)
      .populate('owner', ['id', 'name', 'picture', 'email']);

    ingredient.cocktails = await this.cocktailsService.findByIngredient({ id });

    return ingredient.populate('cocktails.ingredients.data', ['id', 'title']);
  }
}
