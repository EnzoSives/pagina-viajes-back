import { Module } from '@nestjs/common';
import { ImagenService } from './imagenes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { Lugar } from 'src/lugar/entities/lugar.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImagenController } from './imagenes.controller';


@Module({
  controllers: [ImagenController],
  imports: [
    TypeOrmModule.forFeature([Imagen, Lugar]),
    MulterModule.register({
      dest: './uploads', 
    }),
  ],
  providers: [ImagenService],
  exports :[ImagenService] 
})
export class ImagenesModule {}
