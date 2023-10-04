import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LugarService } from './lugar.service';
import { LugarDTO } from './dto/create-lugar.dto';
import { Lugar } from './entities/lugar.entity';

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
  addCiudad(@Body() lugar:LugarDTO ) : Promise<Lugar>{
      return this.lugarService.addLugar(lugar);
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
