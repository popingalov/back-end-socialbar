import { IsOptional, IsArray, IsString, IsBoolean } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly category: string;
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
