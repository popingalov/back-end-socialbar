import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
//

export type CocktailDocument = DocumentTest & Document;
@Schema()
export class DocumentTest {
  @Prop({ type: Number || String })
  testId: any;
}

const DocumentTestSchema = SchemaFactory.createForClass(DocumentTest);
export { DocumentTestSchema };
