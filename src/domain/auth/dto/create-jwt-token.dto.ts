import { Types } from 'mongoose';

export class createJwtTokenDto {
  readonly id: Types.ObjectId;
  readonly email: string;
  readonly locale: string;
}
