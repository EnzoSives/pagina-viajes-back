// imagen.service.ts

import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagenDTO } from './dto/create-imagen.dto';
import { Imagen } from './entities/imagen.entity';
import { Lugar } from 'src/lugar/entities/lugar.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { Express } from 'express';
import { MulterModule } from '@nestjs/platform-express';


@Injectable()
export class ImagenService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
    @InjectRepository(Lugar)
    private readonly lugarRepository: Repository<Lugar>,
  ) {}


  public async guardarImagen(file: Express.Multer.File, imagenDTO: ImagenDTO): Promise<Imagen>  {
    try {
      // Buscar el lugar en la base de datos
      const lugar = await this.lugarRepository.findOne({ where: { id: imagenDTO.idLugar } });
  
      // Verificar si el lugar existe
      if (!lugar) {
        throw new NotFoundException(`No se pudo agregar la imagen. El lugar con ID ${imagenDTO.idLugar} no fue encontrado.`);
      }
  
      // Crear una nueva instancia de la clase Imagen
      const imageUrl = this.generateImageUrl(file.filename);
      const imagen = new Imagen(imageUrl);
      
      // Asignar el lugar a la imagen
      imagen.lugar = lugar;
  
      // Guardar la imagen en la carpeta del servidor
      this.saveImageToServer(file, imageUrl);
  
      // Guardar la imagen en la base de datos
      return await this.imagenRepository.save(imagen);
    } catch (error) {
      // Manejar errores y lanzar una excepción HTTP
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: `500 - ERROR: ${error.message}` },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  private generateImageUrl(filename: string): string {
    // Puedes ajustar la ruta según tu estructura de carpetas
    return `./uploads/${filename}`;
  }

  private saveImageToServer(file: Express.Multer.File, imageUrl: string): void {
    const filePath = path.join(__dirname, '..', '..', 'uploads', file.filename);
    fs.writeFileSync(filePath, file.buffer);
  }
}

