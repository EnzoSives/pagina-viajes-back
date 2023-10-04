import { Test, TestingModule } from '@nestjs/testing';
import { PreferenciaUsuarioService } from './preferencia-usuario.service';

describe('PreferenciaUsuarioService', () => {
  let service: PreferenciaUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferenciaUsuarioService],
    }).compile();

    service = module.get<PreferenciaUsuarioService>(PreferenciaUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
