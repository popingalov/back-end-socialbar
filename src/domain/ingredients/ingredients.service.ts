import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ingredient, IngredientDocument } from './ingredients.schema';

import { CreateIngredientDto } from './dto/create-ingredient-dto';
import { GetIngredientByIdDto } from './dto/get-ingredient-by-id.dto';
import { GetIngredientsDto } from './dto/getAlll.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { CocktailsService } from '../cocktails/cocktails.service';
import { Types } from 'mongoose';

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
      { email: 'popingalov@gmail.com' },
      '-owner',
    );
    // .populate('owner', ['id', 'name', 'picture', 'email']);

    return newIngredient;
  }

  async getIngredients({ owner }: GetIngredientsDto): Promise<Ingredient[]> {
    const newIngredient: Ingredient[] = await this.ingredientModel.find(
      {
        owner,
      },
      '-owner',
    );
    // .populate('owner', ['id', 'name', 'picture', 'email']);

    return newIngredient;
  }

  async getIngredientById({ id }: GetIngredientByIdDto) {
    const ingredient = await this.ingredientModel.findById(id);

    ingredient.cocktails = await this.cocktailsService.findByIngredient({ id });

    return ingredient.populate('cocktails.ingredients.data', ['id', 'title']);
  }

  async deleteIngredient({ id }): Promise<void> {
    console.log(id);

    await this.ingredientModel.findOneAndDelete({ id });
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
