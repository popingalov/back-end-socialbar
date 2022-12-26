import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from '../users/schemas/users.schema';
import { Cocktail, CocktailSchema } from '../cocktails/cocktails.schema';
// import {
//   CategoryItem,
//   CategoryItemSchema,
// } from '../categories/schema/categories.chema';

export type IngredientDocument = Ingredient & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Ingredient {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User | null;

  @Prop({ type: String, ref: 'categories' })
  category: string;

  @Prop({ type: [CocktailSchema], ref: 'Cocktail' })
  cocktails: Cocktail[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: null })
  picture: string | null;

  @Prop({ default: false })
  isDefault: boolean;
}

const IngredientSchema = SchemaFactory.createForClass(Ingredient);

IngredientSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { IngredientSchema };
