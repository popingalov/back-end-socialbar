import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientListDto } from './create-ingredient-list.dto';

export class UpdateIngredientListDto extends PartialType(
  CreateIngredientListDto,
) {}
