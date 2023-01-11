import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class GetRatingDto {
  @IsMongoId()
  readonly id: Types.ObjectId;
}
