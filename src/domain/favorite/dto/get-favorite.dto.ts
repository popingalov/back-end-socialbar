import { Types } from 'mongoose';
import { IsString, Length } from 'class-validator';

export class GetFavoriteDto {
  @IsString()
  @Length(24, 24)
  readonly owner: Types.ObjectId | string;
}

export class GetFavoriteDtoMail {
  @IsString()
  @Length(5, 60)
  readonly email: string;
}
