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

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: 'cocktails' | 'ingredients';

  @Prop({ type: [CategoryItemSchema], ref: 'Category', required: true })
  items: CategoryItem[];
}

const CategorySchema = SchemaFactory.createForClass(Category);

export { CategoryItemSchema, CategorySchema };
