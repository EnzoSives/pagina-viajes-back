import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ContinenteService } from './continente.service';
import { ContinenteDTO } from './dto/create-continente.dto';
import { Continente } from './entities/continente.entity';

@Controller('continente')
export class ContinenteController {
  constructor(private readonly continenteService: ContinenteService) {}

  @Get('all')
  async getCont(): Promise<Continente[]>{
    return this.continenteService.getAll();
  }

  @Get(':id')
  async getId(@Param('id') id:number) : Promise<Continente>{
    return this.continenteService.getId(id)
  }

   @Post('crear')
  addCiudad(@Body() continente:ContinenteDTO ) : Promise<Continente>{
      return this.continenteService.addContinente(continente);
  }

   @Put('actualizar/:id')
  updateCiudadId(@Param('id')id:number, @Body() continente: ContinenteDTO) : Promise<Continente>{
    return this.continenteService.updateContinenteId(id,continente);
  }

  @Delete('eliminar/:id')
  deleteCiudad(@Param('id') id : number) : Promise<boolean> {
    return this.continenteService.deleteContinente(id);
  }
}
