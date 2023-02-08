import { Test, TestingModule } from '@nestjs/testing';
import { GlassesController } from '../glasses.controller';

describe('GlassesController', () => {
  let controller: GlassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlassesController],
    }).compile();

    controller = module.get<GlassesController>(GlassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
