import { Test, TestingModule } from '@nestjs/testing';
import { ContinenteController } from './continente.controller';
import { ContinenteService } from './continente.service';

describe('ContinenteController', () => {
  let controller: ContinenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContinenteController],
      providers: [ContinenteService],
    }).compile();

    controller = module.get<ContinenteController>(ContinenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
