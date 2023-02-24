import { IsIn } from 'class-validator';

export class TokenGenerator {
  @IsIn(['admin'])
  readonly username: string;

  @IsIn([12345])
  readonly password: number;
}
