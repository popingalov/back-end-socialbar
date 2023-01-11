import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class GetIngredientByIdDto {
  @IsMongoId()
  readonly id: Types.ObjectId;
}
