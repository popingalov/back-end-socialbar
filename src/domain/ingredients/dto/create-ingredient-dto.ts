import { Type } from 'class-transformer';
import { IsOptional, IsArray, IsString, IsBoolean } from 'class-validator';

class Category {
  @IsString()
  string;
}

export class CreateIngredientDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsArray()
  @Type(() => Category)
  readonly category: string[];
  @IsString()
  @IsOptional()
  readonly picture?: string;
  @IsBoolean()
  @IsOptional()
  readonly isDefault?: boolean;
  @IsBoolean()
  @IsOptional()
  readonly availability?: boolean;
  @IsBoolean()
  @IsOptional()
  readonly shopping?: boolean;
  @IsBoolean()
  @IsOptional()
  readonly iHave?: boolean;
}

//export class AddListtDto {
//  readonly owner: Types.ObjectId;
//  readonly id: Types.ObjectId;
//}
