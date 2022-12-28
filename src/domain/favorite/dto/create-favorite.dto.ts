import { Types } from 'mongoose';

export class CreateFavoriteDto {
  readonly id: Types.ObjectId | string;
  readonly owner: Types.ObjectId | string;
}
