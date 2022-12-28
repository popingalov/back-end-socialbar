import { Types } from 'mongoose';

export class CreateShopingListDto {
  readonly id: Types.ObjectId | string;
  readonly owner: Types.ObjectId | string;
}
