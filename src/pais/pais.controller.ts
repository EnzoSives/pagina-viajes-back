import { Controller, Get, Post, Body, Patch,Put, Param, Delete, UploadedFiles, UseInterceptors, Req } from '@nestjs/common';
import { PaisService } from './pais.service';
import { Pais } from './entities/pais.entity';
import { PaisDTO } from './dto/create-pais.dto';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}
  
  @Get('all')
  async getLugares(): Promise<Pais[]>{
    return this.paisService.getAll();
  }

  @Get(':id')
  async getId(@Param('id') id:number) : Promise<Pais>{
    return this.paisService.getId(id)
  }

  @Post('crear')
  @UseInterceptors(FilesInterceptor('imagenes', 4))
  async addPais(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() paisDTO: PaisDTO,
    @Req() req: Request, // Importa Request desde 'express'
  ): Promise<Pais> {
    console.log('Cuerpo de la solicitud:', req.body);
    return this.paisService.agregarPais(paisDTO, files);
  }

   @Put('actualizar/:id')
  updatePaisId(@Param('id')id:number, @Body() pais: PaisDTO) : Promise<Pais>{
    return this.paisService.updatePaisId(id,pais);
  }

  @Delete('eliminar/:id')
  deletePais(@Param('id') id : number) : Promise<boolean> {
    return this.paisService.deletePais(id);
  }
}
