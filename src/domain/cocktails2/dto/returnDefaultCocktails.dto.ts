import { Types } from 'mongoose';
import { IFatherCocktail } from './fatherCocktails.dto';
export interface IDefaultCocktails extends IFatherCocktail {
  mine: null;
}
