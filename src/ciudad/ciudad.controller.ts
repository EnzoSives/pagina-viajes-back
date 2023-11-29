import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFiles, UseInterceptors, Req } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/create-ciudad.dto';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('all')
  async getCities(): Promise<Ciudad[]>{
    return this.ciudadService.getAll();
  }

  @Get(':id')
  async getId(@Param('id') id:number) : Promise<Ciudad>{
    return this.ciudadService.getId(id)
  }

  @Post('crear')
  @UseInterceptors(FilesInterceptor('imagenes', 4)) // 'imagenes' es el nombre del campo para las imágenes y 4 es el número máximo de archivos
  async addCiudad(@UploadedFiles() files: Express.Multer.File[], @Body() CiudadDTO: CiudadDTO,
  @Req() req: Request): Promise<Ciudad> {
    return this.ciudadService.agregarCiudad(CiudadDTO, files);
  }

  @Put('actualizar/:id')
  updateCiudadId(@Param('id')id:number, @Body() ciudad: CiudadDTO) : Promise<Ciudad>{
    return this.ciudadService.updateCiudadId(id,ciudad);
  }

  @Delete('eliminar/:id')
  deleteCiudad(@Param('id') id : number) : Promise<boolean> {
    return this.ciudadService.deleteCiudad(id);
  }

  

}
