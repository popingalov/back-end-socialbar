import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Ingredient, IngredientDocument } from './ingredients.schema';

import { CreateIngredientDto } from './dto/create-ingredient-dto';
import { GetIngredientByIdDto } from './dto/get-ingredient-by-id.dto';
import { GetIngredientsDto } from './dto/getAlll.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { CocktailsService } from '../cocktails/cocktails.service';
//
import errorGenerator from '../../helpers/errorGenerator';
//
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

  async getDefault(): Promise<Ingredient[]> {
    const newIngredient: Ingredient[] = await this.ingredientModel.find(
      { email: process.env.OWNER },
      '-owner',
    );

    return newIngredient;
  }

  async getIngredients({ owner }: GetIngredientsDto): Promise<Ingredient[]> {
    const newIngredient: Ingredient[] = await this.ingredientModel.find(
      {
        owner,
      },
      '-owner',
    );

    const defaultIngredients = await this.getDefault();
    return newIngredient.concat(defaultIngredients);
  }

  async getIngredientById({ id }: GetIngredientByIdDto) {
    const ingredient = await this.ingredientModel.findById(id);
    if (!ingredient) {
      errorGenerator('Wrong ID , ingredient not found', 'NOT_FOUND');
    }
    ingredient.cocktails = await this.cocktailsService.findByIngredient({ id });

    return ingredient.populate('cocktails.ingredients.data', ['id', 'title']);
  }

  async deleteIngredient({ id, owner }): Promise<void> {
    await this.ingredientModel.findOneAndDelete({ _id: id, owner });
  }

  async updateIngredient(
    id: Types.ObjectId,
    body: UpdateIngredientDto,
  ): Promise<Ingredient> {
    const updateCocktail = this.ingredientModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return await updateCocktail;
  }
}
