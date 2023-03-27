import { Types } from 'mongoose';
import {
  IsString,
  Length,
  IsObject,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class IngredientIntoDto {
  @IsString()
  @Length(24, 24)
  readonly _id: Types.ObjectId;
  @IsString()
  readonly data: string;
  @IsString()
  readonly measure: string;
  @IsString()
  readonly measureType: string;
  @IsBoolean()
  readonly isOptional: boolean;
  @IsArray()
  readonly alternatives: any[];
  @IsBoolean()
  readonly isDressing: boolean;
}

class RatingsIntoDto {
  @IsNumber()
  readonly one: number;
  @IsNumber()
  readonly two: number;
  @IsNumber()
  readonly three: number;
  @IsNumber()
  readonly four: number;
  @IsNumber()
  readonly five: number;
  @IsNumber()
  readonly total: number;
  @IsNumber()
  readonly average: number;
  @IsString()
  @Length(24, 24)
  readonly _id: Types.ObjectId;
}

export class CocktailDto {
  @IsString()
  @Length(24, 24)
  readonly owner: Types.ObjectId;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientIntoDto)
  readonly ingredients: IngredientIntoDto[];
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => RatingsIntoDto)
  readonly ratings: RatingsIntoDto;
  @IsArray()
  readonly category: string[];
  @IsString()
  readonly glass: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly recipe: string;
  @IsString()
  readonly picture: string;
  @IsBoolean()
  readonly isDefault: boolean;
  @IsBoolean()
  readonly favorite: boolean;
  @IsBoolean()
  readonly iCan: boolean;
  @IsArray()
  readonly lacks: any[];
  @IsString()
  @Length(24, 24)
  readonly _id: Types.ObjectId;
  @IsNumber()
  readonly __v: number;
  @IsString()
  @Length(24, 24)
  readonly id: Types.ObjectId;
}
