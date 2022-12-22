import { Types } from 'mongoose';

export class updateUserDto {
  readonly id: Types.ObjectId;
  readonly payload: {
    email?: string;
  };
}
