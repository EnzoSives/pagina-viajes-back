import { PreferenciaUsuarioService } from './preferencia-usuario.service';
import { PreferenciaUsuarioDTO } from './dto/create-preferencia-usuario.dto';
import { UpdatePreferenciaUsuarioDto } from './dto/update-preferencia-usuario.dto';
export declare class PreferenciaUsuarioController {
    private readonly preferenciaUsuarioService;
    constructor(preferenciaUsuarioService: PreferenciaUsuarioService);
    create(PreferenciaUsuarioDTO: PreferenciaUsuarioDTO): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePreferenciaUsuarioDto: UpdatePreferenciaUsuarioDto): string;
    remove(id: string): string;
}
