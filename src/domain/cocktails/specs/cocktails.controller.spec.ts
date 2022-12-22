import { Test, TestingModule } from '@nestjs/testing';
import { CocktailsController } from '../cocktails.controller';

describe('CocktailsController', () => {
  let controller: CocktailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CocktailsController],
    }).compile();

    controller = module.get<CocktailsController>(CocktailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
