import { PartialType } from '@nestjs/mapped-types';
import { ContinenteDTO } from './create-continente.dto';

export class UpdateContinenteDto extends PartialType(ContinenteDTO) {}
