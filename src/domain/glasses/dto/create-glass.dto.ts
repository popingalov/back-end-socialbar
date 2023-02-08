import { IsString } from 'class-validator';

export class CreateGlassDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly picture: string;
}
