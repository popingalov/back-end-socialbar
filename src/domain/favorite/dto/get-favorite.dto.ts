import { Types } from 'mongoose';

export class GetFavoriteDtoMail {
  readonly email: Types.ObjectId | string;
}
export class GetFavoriteDto {
  readonly owner: Types.ObjectId | string;
}
