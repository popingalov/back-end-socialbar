import { Types } from 'mongoose';

export class GetFavoriteDto {
  readonly owner: Types.ObjectId | string;
}
export class GetFavoriteDtoMail {
  readonly email: Types.ObjectId | string;
}
