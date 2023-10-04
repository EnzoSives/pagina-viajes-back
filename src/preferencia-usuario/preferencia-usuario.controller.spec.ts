import { Test, TestingModule } from '@nestjs/testing';
import { PreferenciaUsuarioController } from './preferencia-usuario.controller';
import { PreferenciaUsuarioService } from './preferencia-usuario.service';

describe('PreferenciaUsuarioController', () => {
  let controller: PreferenciaUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferenciaUsuarioController],
      providers: [PreferenciaUsuarioService],
    }).compile();

    controller = module.get<PreferenciaUsuarioController>(PreferenciaUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
