import { Types } from 'mongoose';

export class CreateRatingDto {
  readonly id: Types.ObjectId | string;
  readonly owner: Types.ObjectId | string;
  readonly rating: number;
}
