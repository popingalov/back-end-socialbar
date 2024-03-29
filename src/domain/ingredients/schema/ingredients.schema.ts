import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from '../../users/schemas/users.schema';
import {
  Cocktail,
  CocktailSchema,
} from '../../cocktails/shame/cocktails.schema';
// import {
//   CategoryItem,
//   CategoryItemSchema,
// } from '../categories/schema/categories.chema';

export type IngredientDocument = Ingredient & Document;

@Schema({ _id: false })
export class IngredientData {
  @Prop({
    default: () => {
      return new Types.ObjectId();
    },
  })
  id: Types.ObjectId;

  @Prop({ type: [], ref: 'Cocktail' })
  cocktails: any[];

  //@Prop({ type: String, ref: 'categories' })
  //category: string;

  @Prop({ type: String })
  category: string[];

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({
    default:
      'https://media.istockphoto.com/id/942856796/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D1%83%D0%B1%D0%B0-%D0%BB%D1%96%D0%B1%D1%80%D0%B5-%D0%BA%D0%BE%D0%BA%D1%82%D0%B5%D0%B9%D0%BB%D1%8C-%D0%BD%D0%B0-%D1%81%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%BE%D0%BC%D1%83-%D1%82%D0%BB%D1%96.jpg?s=612x612&w=0&k=20&c=5PMyeCGkOJPm9TZuTxDOe4TnRR7umMVUykW18sLawms=',
  })
  picture: string;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: false })
  availability: boolean;

  @Prop({ default: false })
  shopping: boolean;

  @Prop({ default: false })
  iHave: boolean;
}

const IngredientDataSchema = SchemaFactory.createForClass(IngredientData);

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class Ingredient {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    default: (state) => state.en.id,
  })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User | null;

  @Prop({ type: IngredientDataSchema, required: true })
  en: IngredientData;

  @Prop({ type: IngredientDataSchema, default: {} })
  ua: IngredientData;

  @Prop({ type: IngredientDataSchema, default: {} })
  ru: IngredientData;
}

const IngredientSchema = SchemaFactory.createForClass(Ingredient);
export { IngredientSchema };
