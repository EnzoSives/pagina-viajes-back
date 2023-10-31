import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { Pais } from './entities/pais.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Continente } from 'src/continente/entities/continente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pais, Ciudad, Continente])],
  controllers: [PaisController],
  providers: [PaisService],
})
export class PaisModule {}
