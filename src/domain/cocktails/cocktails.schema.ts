import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from 'domain/users/schemas/users.schema';
import {
  CategoryItem,
  CategoryItemSchema,
} from 'domain/categories/categories.schema';

export type CocktailDocument = Cocktail & Document;

@Schema()
export class CocktailIngredients extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Ingredient' })
  data: Types.ObjectId;

  @Prop({ required: true })
  measure: string;

  @Prop({ required: true })
  measureType: string;

  @Prop({ default: false })
  isOptional: boolean;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Ingredient', default: null })
  alternatives: Types.ObjectId[] | null;

  @Prop({ default: false })
  isDressing: boolean;
}

const CocktailIngredientsSchema =
  SchemaFactory.createForClass(CocktailIngredients);

@Schema({
  toJSON: {
    virtuals: true,
  },
  toObject: { virtuals: true },
})
export class Cocktail {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User | null;

  @Prop({ type: [CocktailIngredientsSchema], ref: 'Ingredient' })
  ingredients: CocktailIngredients[];

  @Prop({ type: [CategoryItemSchema], ref: 'Category', required: true })
  category: CategoryItem[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Glass' })
  glass: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  recipe: string;

  @Prop({ required: false, default: null })
  picture: string | null;

  @Prop({ required: true, default: false })
  isDefault: boolean;
}

const CocktailSchema = SchemaFactory.createForClass(Cocktail);

CocktailSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { CocktailSchema, CocktailIngredientsSchema };
