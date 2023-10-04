import { Module } from '@nestjs/common';
import { ContinenteService } from './continente.service';
import { ContinenteController } from './continente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from 'src/pais/entities/pais.entity';
import { Continente } from './entities/continente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Continente, Pais])],
  controllers: [ContinenteController],
  providers: [ContinenteService],
})
export class ContinenteModule {}
