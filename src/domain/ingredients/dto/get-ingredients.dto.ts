import { Types } from 'mongoose';
import { IsString, Length } from 'class-validator';

export class GetIngredientsDto {
  @IsString()
  @Length(24, 24)
  readonly owner: Types.ObjectId;
}
