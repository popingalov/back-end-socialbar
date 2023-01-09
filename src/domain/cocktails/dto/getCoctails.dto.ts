import {
  IsEmail,
  IsNumber,
  IsString,
  IsMongoId,
  MaxLength,
  MinLength,
  IS_MONGO_ID,
  isNumber,
} from 'class-validator';
import { Types } from 'mongoose';

export class GetCocktailsByIdDto {
  @IsString()
  user: string;
}
