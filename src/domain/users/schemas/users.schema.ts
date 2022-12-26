import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsersDocument = User & Document;

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

  @Prop({ type: String, required: true, default: 'uk' })
  locale: string;

  @Prop()
  picture: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { UserSchema };
