import { Types } from 'mongoose';

export interface CocktailDto {
  owner: string;
  ingredients: Ingredient[];
  ratings: Ratings;
  category: string[];
  glass: string;
  title: string;
  description: string;
  recipe: string;
  picture: string;
  isDefault: boolean;
  favorite: boolean;
  iCan: boolean;
  lacks: any[];
  _id: Types.ObjectId;
  __v: number;
  id: Types.ObjectId;
}

interface Ratings {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  total: number;
  average: number;
  _id: Types.ObjectId;
}

interface Ingredient {
  data: string;
  measure: string;
  measureType: string;
  isOptional: boolean;
  alternatives: any[];
  isDressing: boolean;
  _id: Types.ObjectId;
}
