import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ _id: false })
export class CategoryItem extends Document {
  @Prop()
  title: string;

  @Prop()
  code: string;
}

const CategoryItemSchema = SchemaFactory.createForClass(CategoryItem);

@Schema({ _id: false })
export class CategoryData extends Document {
  @Prop({ required: true, unique: true })
  name: 'cocktails' | 'ingredients';

  @Prop({ type: [CategoryItemSchema], ref: 'CategoryA', required: true })
  items: CategoryItem[];
}

const CategoryDataSchema = SchemaFactory.createForClass(CategoryData);

@Schema()
export class Category {
  @Prop({ type: CategoryDataSchema, required: true })
  en: CategoryData;

  @Prop({ type: CategoryDataSchema, required: false, default: null })
  ua: CategoryData | null;

  @Prop({ type: CategoryDataSchema, required: false, default: null })
  ru: CategoryData | null;
}

const CategorySchema = SchemaFactory.createForClass(Category);

export { CategoryItemSchema, CategorySchema };
