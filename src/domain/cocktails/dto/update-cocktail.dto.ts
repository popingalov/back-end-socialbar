import { Types } from 'mongoose';

export class UpdateCocktailDto {
  readonly id: Types.ObjectId;
  readonly title: string;
  readonly description: string;
}
