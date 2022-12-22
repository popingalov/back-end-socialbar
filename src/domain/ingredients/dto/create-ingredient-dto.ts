import { Types } from 'mongoose';

export class CreateIngredientDto {
  readonly owner: Types.ObjectId;
  readonly title: string;
  readonly description: string;
}
