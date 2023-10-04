import { Module } from '@nestjs/common';
import { PreferenciaUsuarioService } from './preferencia-usuario.service';
import { PreferenciaUsuarioController } from './preferencia-usuario.controller';

@Module({
  controllers: [PreferenciaUsuarioController],
  providers: [PreferenciaUsuarioService],
})
export class PreferenciaUsuarioModule {}
