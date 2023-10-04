import { Test, TestingModule } from '@nestjs/testing';
import { ContinenteService } from './continente.service';

describe('ContinenteService', () => {
  let service: ContinenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContinenteService],
    }).compile();

    service = module.get<ContinenteService>(ContinenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
