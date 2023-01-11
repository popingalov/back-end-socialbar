import { Types } from 'mongoose';
import {
  IsMongoId,
  IsString,
  IsNumber,
  Length,
  Min,
  Max,
} from 'class-validator';

export class CreateRatingDto {
  @IsMongoId()
  readonly id: Types.ObjectId;
  @IsString()
  @Length(24, 24)
  readonly owner: Types.ObjectId;
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(5)
  readonly rating: number;
}
