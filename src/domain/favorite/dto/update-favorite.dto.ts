import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { Types } from 'mongoose';
export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
  readonly id: Types.ObjectId | string;
  readonly owner: Types.ObjectId | string;
  readonly cocktails: Types.ObjectId[];
}
