import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreferenciaUsuarioService } from './preferencia-usuario.service';
import { PreferenciaUsuarioDTO } from './dto/create-preferencia-usuario.dto';
import { UpdatePreferenciaUsuarioDto } from './dto/update-preferencia-usuario.dto';

@Controller('preferencia-usuario')
export class PreferenciaUsuarioController {
  constructor(private readonly preferenciaUsuarioService: PreferenciaUsuarioService) {}

  @Post()
  create(@Body() PreferenciaUsuarioDTO: PreferenciaUsuarioDTO) {
    return this.preferenciaUsuarioService.create(PreferenciaUsuarioDTO);
  }

  @Get()
  findAll() {
    return this.preferenciaUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenciaUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreferenciaUsuarioDto: UpdatePreferenciaUsuarioDto) {
    return this.preferenciaUsuarioService.update(+id, updatePreferenciaUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenciaUsuarioService.remove(+id);
  }
}
