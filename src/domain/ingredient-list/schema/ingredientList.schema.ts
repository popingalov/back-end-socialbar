import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from '../../users/schemas/users.schema';
import { Ingredient } from '../../ingredients/ingredients.schema';

export type IngredientListDocument = IngredientList & Document;

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class IngredientList {
  id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  owner: User | null;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Ingredient', default: [] })
  list: Ingredient[];
}

const IngredientListSchema = SchemaFactory.createForClass(IngredientList);

IngredientListSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { IngredientListSchema };
