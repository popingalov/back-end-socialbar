import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemsDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly code: string;
}

export class CreateCategoryDto {
  @IsString()
  readonly name: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemsDto)
  readonly items: ItemsDto[];
}
