import { IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class IdDto {
  @IsString()
  @Length(24, 24)
  id: Types.ObjectId;
}
