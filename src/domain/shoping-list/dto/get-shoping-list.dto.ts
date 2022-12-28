import { Types } from 'mongoose';

export class GetShopingListDto {
  readonly owner: Types.ObjectId | string;
}
