import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from 'domain/users/schemas/users.schema';
import { Cocktail, CocktailSchema } from 'domain/cocktails/cocktails.schema';

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

  // @Prop({type: 's'})
  // category: Types.Categories // new

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
