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

  @Prop({ required: true, unique: true, message: 'Name must be unique' })
  email: string;

  @Prop({ required: true, message: 'Name must be unique' })
  name: string;

  @Prop()
  picture: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export { UserSchema };
