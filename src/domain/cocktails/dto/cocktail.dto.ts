import { Types } from 'mongoose';

export class CocktailDto {
  readonly owner: Types.ObjectId;
  title: string;
  description: string;
  ingredients: {
    data: { readonly _id: any; title: string };
    measure: string;
    measureType: string;
    isOptional: boolean;
    alternatives: Types.ObjectId[] | null;
    isDressing: boolean;
  }[];
}
