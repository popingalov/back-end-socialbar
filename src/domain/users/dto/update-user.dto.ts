import {
  IsObject,
  ValidateNested,
  IsEmail,
  Length,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PayloadDto {
  @IsEmail()
  @Length(5, 60)
  readonly email?: string;
}

export class UpdateUserDto {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => PayloadDto)
  readonly payload: PayloadDto;
}
