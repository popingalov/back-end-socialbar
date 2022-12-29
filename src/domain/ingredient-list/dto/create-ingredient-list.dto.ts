import { Types } from 'mongoose';

export class CreateIngredientListDto {
  readonly owner: Types.ObjectId;
  readonly id: Types.ObjectId;
}
