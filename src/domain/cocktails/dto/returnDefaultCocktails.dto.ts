import { IFatherCocktail } from './fatherCocktails.dto';
export interface IDefaultCocktails extends IFatherCocktail {
  mine: null;
  lang?: string;
}
