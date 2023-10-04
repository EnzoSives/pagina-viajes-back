import { Injectable } from '@nestjs/common';
import { PreferenciaUsuarioDTO } from './dto/create-preferencia-usuario.dto';
import { UpdatePreferenciaUsuarioDto } from './dto/update-preferencia-usuario.dto';

@Injectable()
export class PreferenciaUsuarioService {
  create(PreferenciaUsuarioDTO: PreferenciaUsuarioDTO) {
    return 'This action adds a new preferenciaUsuario';
  }

  findAll() {
    return `This action returns all preferenciaUsuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preferenciaUsuario`;
  }

  update(id: number, updatePreferenciaUsuarioDto: UpdatePreferenciaUsuarioDto) {
    return `This action updates a #${id} preferenciaUsuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} preferenciaUsuario`;
  }
}
