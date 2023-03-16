import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsersDocument = User & Document;

@Schema({ _id: false })
export class RequestsLimit {
  id: Types.ObjectId;

  @Prop({ type: Number })
  current: number;

  @Prop({ type: Number })
  max: number;

  @Prop({ type: String })
  time: String;
}

const RequestsLimitSchema = SchemaFactory.createForClass(RequestsLimit);

@Schema({
  toJSON: {
    virtuals: true,
  },
})
export class User {
  id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
    message: 'email must be unique',
  })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, default: 'uk' })
  locale: string;

  @Prop()
  picture: string;

  @Prop({ type: String, default: 'allIngredients' })
  startPage: string;

  @Prop({ type: RequestsLimitSchema })
  requestsLimit?: RequestsLimit;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { UserSchema };
