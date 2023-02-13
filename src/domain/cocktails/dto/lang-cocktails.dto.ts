import { Contains, IsString } from 'class-validator';

export class LangCocktailsDto {
  @IsString()
  readonly lang: 'en' | 'ua' | 'ru';
}
