import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class GetUserIdDto {
  @IsMongoId()
  readonly id: Types.ObjectId;
}
