import { Types } from 'mongoose';
import {
  IsString,
  Length,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';

import { Type } from 'class-transformer';

class TestNewDto {
  @IsString()
  data: string;
  @IsString()
  measure: string;
  @IsString()
  measureType: string;
}

class Category {
  @IsString()
  string;
}

export class CreateCocktailDto {
  @IsString()
  @Length(24, 24)
  @IsOptional()
  readonly owner?: Types.ObjectId;
  @IsString()
  @Length(24, 24)
  @IsOptional()
  readonly glass?: Types.ObjectId;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestNewDto)
  readonly ingredients: TestNewDto[];
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  readonly isDefault: boolean;
  @IsString()
  readonly recipe: string;
  @IsArray()
  @Type(() => Category)
  readonly category: string[];
}
