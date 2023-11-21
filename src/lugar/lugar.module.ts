import { Module } from '@nestjs/common';
import { LugarService } from './lugar.service';
import { LugarController } from './lugar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Lugar } from './entities/lugar.entity';
import { PreferenciaUsuario } from 'src/preferencia-usuario/entities/preferencia-usuario.entity';
import { Imagen } from 'src/imagenes/entities/imagen.entity';
import { ImagenService } from 'src/imagenes/imagenes.service';
import { CiudadService } from 'src/ciudad/ciudad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lugar, Ciudad, PreferenciaUsuario, Imagen])],
  controllers: [LugarController],
  providers: [LugarService],
  exports: [LugarService]
})
export class LugarModule {}
