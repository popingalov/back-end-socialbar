import { Types } from 'mongoose';
import { IFatherCocktail, Cocktail } from './fatherCocktails.dto';
export interface IMyCocktails extends IFatherCocktail {
  mine: Cocktail[] | null;
}
