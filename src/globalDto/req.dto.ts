import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class ReqDto {
  @IsString()
  @Length(24, 24)
  id: Types.ObjectId;
  @IsBoolean()
  @IsOptional()
  trigger?: boolean;
}
