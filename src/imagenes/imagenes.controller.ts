// imagen.controller.ts

import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagenDTO } from './dto/create-imagen.dto';
import { ImagenService } from './imagenes.service';


@Controller('imagenes')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  @Post('subir')
  @UseInterceptors(FileInterceptor('imagen'))
  async subirImagen(@UploadedFile() file: Express.Multer.File, @Body() imagenDTO: ImagenDTO) {
    return this.imagenService.guardarImagen(file, imagenDTO);
  }
}


