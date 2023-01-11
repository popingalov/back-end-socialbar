import { Types } from 'mongoose';
import { IsMongoId, IsString, Length } from 'class-validator';

export class CreateFavoriteDto {
  @IsMongoId()
  readonly id: Types.ObjectId;
  @IsString()
  @Length(24, 24)
  readonly owner: Types.ObjectId;
}
