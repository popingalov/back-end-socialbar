import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
//
import { User } from '../../users/schemas/users.schema';
import {
  CocktailIngredients2,
  CocktailIngredientsSchema2,
} from './ingredient2.shema';
import { CocktailRating, CocktailRatingSchema } from './cocktailRaiting.dto';
import defaultRating from 'src/helpers/ratingsFunc/defaultRating';

//
export type CocktailDocument2 = Cocktail2 & Document;

@Schema({ _id: false })
export class CocktailData {
  @Prop({
    default: () => {
      return new Types.ObjectId();
    },
  })
  id: Types.ObjectId;

  @Prop({
    type: [CocktailIngredientsSchema2],
    //required: true,
    ref: 'Ingredient',
  })
  ingredients: CocktailIngredients2[];

  @Prop({
    type: CocktailRatingSchema,
    //required: true,
    default: defaultRating,
  })
  ratings: CocktailRating;

  @Prop({
    type: [String],
    //required: true,
  })
  category: string[];

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Glass',
    default: '63aa371d16cce2241510f99f',
  })
  glass: Types.ObjectId;

  @Prop({
    //required: true,
  })
  title: string;

  @Prop({
    type: String,
    //required: true,
  })
  description: string;

  @Prop({
    type: String,
    //required: true,
  })
  recipe: string;

  @Prop({
    //required: false,
    default:
      'https://media.istockphoto.com/id/942856796/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D1%83%D0%B1%D0%B0-%D0%BB%D1%96%D0%B1%D1%80%D0%B5-%D0%BA%D0%BE%D0%BA%D1%82%D0%B5%D0%B9%D0%BB%D1%8C-%D0%BD%D0%B0-%D1%81%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%BE%D0%BC%D1%83-%D1%82%D0%BB%D1%96.jpg?s=612x612&w=0&k=20&c=5PMyeCGkOJPm9TZuTxDOe4TnRR7umMVUykW18sLawms=',
  })
  picture: string;

  @Prop({ default: false })
  isDefault: boolean;

  @Prop({ default: false })
  favorite: boolean;

  @Prop({ default: false })
  iCan: boolean;

  @Prop({ default: [] })
  lacks: [];
}

const CocktailDataSchema = SchemaFactory.createForClass(CocktailData);

@Schema({
  toJSON: {
    virtuals: true,
  },
  // toObject: { virtuals: true },
})
export class Cocktail2 {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    default: (state) => state.en.id,
  })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ type: CocktailDataSchema, required: true })
  en: CocktailData;

  @Prop({ type: CocktailDataSchema, default: {} })
  ua: CocktailData;

  @Prop({ type: CocktailDataSchema, default: {} })
  ru: CocktailData;
}

const CocktailSchema = SchemaFactory.createForClass(Cocktail2);
export { CocktailSchema };