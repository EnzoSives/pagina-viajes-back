import { Module } from '@nestjs/common';
import { LugarService } from './lugar.service';
import { LugarController } from './lugar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Lugar } from './entities/lugar.entity';
import { PreferenciaUsuario } from 'src/preferencia-usuario/entities/preferencia-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lugar, Ciudad, PreferenciaUsuario])],
  controllers: [LugarController],
  providers: [LugarService],
})
export class LugarModule {}
