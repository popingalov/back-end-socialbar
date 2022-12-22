import { Types } from 'mongoose';

import { CocktailIngredients } from '../cocktails.schema';

export class CreateCocktailDto {
  readonly owner: Types.ObjectId;
  readonly title: string;
  readonly description: string;
  readonly ingredients: CocktailIngredients[];
}
