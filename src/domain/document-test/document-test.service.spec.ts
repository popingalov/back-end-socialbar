import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTestService } from './document-test.service';

describe('DocumentTestService', () => {
  let service: DocumentTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentTestService],
    }).compile();

    service = module.get<DocumentTestService>(DocumentTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
