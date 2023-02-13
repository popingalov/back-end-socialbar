import { Types } from 'mongoose';
import { IsMongoId, IsString } from 'class-validator';

export class UpdateCocktailDto {
  readonly id: Types.ObjectId;
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
}
