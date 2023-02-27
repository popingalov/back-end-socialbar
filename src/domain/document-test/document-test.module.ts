import { Module } from '@nestjs/common';
import { DocumentTestService } from './document-test.service';
import { DocumentTestController } from './document-test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentTest } from './entities/document-test.entity';
import { DocumentTestSchema } from './shame/documentTest.schema';
@Module({
  controllers: [DocumentTestController],
  providers: [DocumentTestService],
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentTest.name,
        schema: DocumentTestSchema,
      },
    ]),
  ],
})
export class DocumentTestModule {}
