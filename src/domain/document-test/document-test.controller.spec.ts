import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTestController } from './document-test.controller';
import { DocumentTestService } from './document-test.service';

describe('DocumentTestController', () => {
  let controller: DocumentTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentTestController],
      providers: [DocumentTestService],
    }).compile();

    controller = module.get<DocumentTestController>(DocumentTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
