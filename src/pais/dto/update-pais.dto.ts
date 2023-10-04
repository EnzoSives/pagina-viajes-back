import { PartialType } from '@nestjs/mapped-types';
import { PaisDTO } from './create-pais.dto';


export class UpdatePaisDto extends PartialType(PaisDTO) {}
