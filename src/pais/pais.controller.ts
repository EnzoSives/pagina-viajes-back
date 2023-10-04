import { Controller, Get, Post, Body, Patch,Put, Param, Delete } from '@nestjs/common';
import { PaisService } from './pais.service';
import { Pais } from './entities/pais.entity';
import { PaisDTO } from './dto/create-pais.dto';

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
  addPais(@Body() pais:PaisDTO ) : Promise<Pais>{
      return this.paisService.addPais(pais);
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
