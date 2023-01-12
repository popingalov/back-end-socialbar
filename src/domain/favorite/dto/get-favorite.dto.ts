import { IsEmail, Length } from 'class-validator';

export class GetFavoriteDtoMail {
  @IsEmail()
  @Length(5, 60)
  readonly email: string;
}
