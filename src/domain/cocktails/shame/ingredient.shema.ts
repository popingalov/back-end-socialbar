import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type CocktailIngredientsDocument = CocktailIngredients & Document;

@Schema()
export class CocktailIngredients {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Ingredient', required: true })
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

export const CocktailIngredientsSchema =
  SchemaFactory.createForClass(CocktailIngredients);
