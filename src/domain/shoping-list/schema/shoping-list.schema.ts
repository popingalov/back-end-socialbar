import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from '../../users/schemas/users.schema';
import { Ingredient } from 'src/domain/ingredients/schema/ingredients.schema';

export type ShopingListDocument = ShopingList & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: { virtuals: true },
})
export class ShopingList {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User | null;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Ingredient' })
  ingredients: Ingredient[];
}

const ShopingListSchema = SchemaFactory.createForClass(ShopingList);

ShopingListSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { ShopingListSchema };
