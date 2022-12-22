import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type GlassDocument = Glass & Document;

@Schema()
export class Glass {
  id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  picture: string;
}

const GlassSchema = SchemaFactory.createForClass(Glass);

GlassSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { GlassSchema };
