import { Types } from 'mongoose';
import { IsString, Length } from 'class-validator';

export class GetIngredientListDto {
  @IsString()
  @Length(24, 24)
  readonly owner: Types.ObjectId;
}
