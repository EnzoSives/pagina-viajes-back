import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { Pais } from 'src/pais/entities/pais.entity';
import { Lugar } from 'src/lugar/entities/lugar.entity';
import { Ciudad } from './entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad,Pais,Lugar])],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
