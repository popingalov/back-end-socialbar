import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateIngredientDto {
  @IsString()
  @IsOptional()
  readonly title?: string;
  @IsString()
  @IsOptional()
  readonly description?: string;
  @IsString()
  @IsOptional()
  readonly category?: string;
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
