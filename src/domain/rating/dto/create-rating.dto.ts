import { IsNumber, Min, Max } from 'class-validator';

export class CreateRatingDto {
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(5)
  readonly rating: number;
}
