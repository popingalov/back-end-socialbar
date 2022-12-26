import { Types } from 'mongoose';

export class GetIngredientsDto {
  readonly owner: Types.ObjectId;
  readonly locale?: string;
}
