import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/create-ciudad.dto';

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
  addCiudad(@Body() ciudad:CiudadDTO ) : Promise<Ciudad>{
      return this.ciudadService.addCiudad(ciudad);
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
