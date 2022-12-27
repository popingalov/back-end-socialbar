import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from '../../users/schemas/users.schema';
import { Cocktail, CocktailSchema } from '../../cocktails/cocktails.schema';

export type FavoriteDocument = Favorite & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: { virtuals: true },
})
export class Favorite {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User | null;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Cocktail' })
  cocktails: Cocktail[];
}

const FavoriteSchema = SchemaFactory.createForClass(Favorite);

FavoriteSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { FavoriteSchema };
