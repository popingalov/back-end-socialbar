import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Cocktail } from '../cocktails/cocktails.schema';

import { User } from '../users/schemas/users.schema';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  id: Types.ObjectId;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Cocktail', required: true })
  cocktails: Cocktail[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User;
}

const FavoriteSchema = SchemaFactory.createForClass(Favorite);

FavoriteSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { FavoriteSchema };
