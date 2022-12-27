import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { Types } from 'mongoose';
export class TakeAllDto extends PartialType(CreateFavoriteDto) {
  readonly owner: Types.ObjectId | string;
}
