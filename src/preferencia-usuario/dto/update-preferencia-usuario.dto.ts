import { PartialType } from '@nestjs/mapped-types';
import { PreferenciaUsuarioDTO } from './create-preferencia-usuario.dto';

export class UpdatePreferenciaUsuarioDto extends PartialType(PreferenciaUsuarioDTO) {}
