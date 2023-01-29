import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class CreateGoogleUserDto {
  @IsEmail()
  @Length(5, 60)
  readonly email: string;
  @IsString()
  readonly name: string;
  @IsString()
  @Length(1, 3)
  @IsOptional()
  readonly locale: string;
  @IsString()
  readonly picture: string;
}
