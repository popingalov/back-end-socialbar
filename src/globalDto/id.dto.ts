import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class IdDto {
  @IsMongoId()
  readonly id: Types.ObjectId;
}
