import {
  IsMongoId,
  IsString,
  IsEmail,
  Length,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';

export class FindOneUserDto {
  @IsMongoId()
  @IsOptional()
  readonly id?: Types.ObjectId;
  @IsEmail()
  @Length(5, 60)
  @IsOptional()
  readonly email?: string;
  @IsString()
  @IsOptional()
  readonly googleID?: string;
  @IsString()
  @IsOptional()
  readonly token?: string;
}

//export class FindOneUserDto {
//  readonly id?: Types.ObjectId;
//  readonly email?: string;
//  readonly googleID?: string;
//  readonly token?: string;
//}
