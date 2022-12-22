import { Test, TestingModule } from '@nestjs/testing';
import { GlassesService } from '../glasses.service';

describe('GlassesService', () => {
  let service: GlassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlassesService],
    }).compile();

    service = module.get<GlassesService>(GlassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
