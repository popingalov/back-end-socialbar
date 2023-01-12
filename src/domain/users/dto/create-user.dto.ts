import { IsString, Length, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateGoogleUserDto } from 'src/domain/auth/dto/create-google-user.dto';

export class CreateUserDto extends PartialType(CreateGoogleUserDto) {
  @IsString()
  @IsOptional()
  readonly startPage?: string;
}
