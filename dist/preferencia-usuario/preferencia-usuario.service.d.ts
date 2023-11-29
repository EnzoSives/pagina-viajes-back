import { PreferenciaUsuarioDTO } from './dto/create-preferencia-usuario.dto';
import { UpdatePreferenciaUsuarioDto } from './dto/update-preferencia-usuario.dto';
export declare class PreferenciaUsuarioService {
    create(PreferenciaUsuarioDTO: PreferenciaUsuarioDTO): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePreferenciaUsuarioDto: UpdatePreferenciaUsuarioDto): string;
    remove(id: number): string;
}
