import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class GetCocktailsByIdDto {
  @IsString()
  user: string;
}
