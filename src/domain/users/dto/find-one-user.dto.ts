import { Types } from 'mongoose';

export class findOneUserDto {
  readonly id?: Types.ObjectId;
  readonly email?: string;
  readonly googleID?: string;
  readonly token?: string;
}
