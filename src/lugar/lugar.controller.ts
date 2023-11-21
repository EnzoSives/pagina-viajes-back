import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { LugarService } from './lugar.service';
import { LugarDTO } from './dto/create-lugar.dto';
import { Lugar } from './entities/lugar.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('lugar')
export class LugarController {
  constructor(private readonly lugarService: LugarService) {}

  @Get('all')
  async getLugares(): Promise<Lugar[]>{
    return this.lugarService.getAll();
  }

  @Get(':id')
  async getId(@Param('id') id:number) : Promise<Lugar>{
    return this.lugarService.getId(id)
  }

  @Post('crear')
@UseInterceptors(FilesInterceptor('imagenes', 4)) // 'imagenes' es el nombre del campo para las imágenes y 4 es el número máximo de archivos
async addLugar(@UploadedFiles() files: Express.Multer.File[], @Body() lugarDTO: LugarDTO): Promise<Lugar> {
  return this.lugarService.agregarLugar(lugarDTO, files);
}


   @Put('actualizar/:id')
  updateLugarId(@Param('id')id:number, @Body() lugar: LugarDTO) : Promise<Lugar>{
    return this.lugarService.updateLugarId(id,lugar);
  }

  @Delete('eliminar/:id')
  deleteLugar(@Param('id') id : number) : Promise<boolean> {
    return this.lugarService.deleteLugar(id);
  }
}
