import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from '../../users/schemas/users.schema';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User | null;

  @Prop({ type: Number, required: true })
  rating: number;
}

const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { RatingSchema };
