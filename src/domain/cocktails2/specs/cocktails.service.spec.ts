import { Test, TestingModule } from '@nestjs/testing';
import { CocktailsService } from '../cocktails.service';

describe('CocktailsService', () => {
  let service: CocktailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CocktailsService],
    }).compile();

    service = module.get<CocktailsService>(CocktailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
