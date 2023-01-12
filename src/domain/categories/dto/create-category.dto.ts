import { IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemsDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly code: string;
}

export class CreateCategoryDto {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ItemsDto)
  readonly items: ItemsDto;
}
