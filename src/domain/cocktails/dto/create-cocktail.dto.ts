import { Types } from 'mongoose';
import {
  IsEmail,
  IsNumber,
  IsString,
  IsMongoId,
  MaxLength,
  MinLength,
  isNumber,
  Length,
  IsOptional,
  IsArray,
  ArrayContains,
  ValidateNested,
} from 'class-validator';
import { CocktailIngredients } from '../shame/ingredient.shema';
import { Type } from 'class-transformer';

class TestNewDto {
  data: string;
  measure: string;
  measureType: string;
}

export class CreateCocktailDto {
  // @IsString()
  // @Length(24, 24)
  // @IsOptional()
  // readonly owner?: Types.ObjectId;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestNewDto)
  readonly ingredients: TestNewDto[];
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly isDefault: number;
  @IsNumber()
  readonly recipe: number;
}
