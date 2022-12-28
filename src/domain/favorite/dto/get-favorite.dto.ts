import { Types } from 'mongoose';

export class GetFavoriteDto {
  readonly owner: Types.ObjectId | string;
}
