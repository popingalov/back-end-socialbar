import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CocktailRating extends Document {
  @Prop({ type: Number, default: 0 })
  one: number;

  @Prop({ type: Number, default: 0 })
  two: number;

  @Prop({ type: Number, default: 0 })
  three: number;

  @Prop({ type: Number, default: 0 })
  four: number;

  @Prop({ type: Number, default: 0 })
  five: number;

  @Prop({ type: Number, default: 0 })
  total: number;

  @Prop({ type: Number, default: 0 })
  average: number;
}

export const CocktailRatingSchema = SchemaFactory.createForClass(CocktailRating);
