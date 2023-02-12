import { IsMongoId, Length } from 'class-validator';
import { Types } from 'mongoose';

export class IdDto {
  @Length(24, 24)
  // @IsMongoId()
  readonly id: Types.ObjectId;
}
