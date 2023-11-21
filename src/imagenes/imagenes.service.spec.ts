import { Test, TestingModule } from '@nestjs/testing';
import { ImagenService } from './imagenes.service';

describe('ImagenesService', () => {
  let service: ImagenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenService],
    }).compile();

    service = module.get<ImagenService>(ImagenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
