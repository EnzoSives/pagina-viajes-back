import { PartialType } from '@nestjs/mapped-types';
import {CiudadDTO} from './create-ciudad.dto'

export class UpdateCiudadDto extends PartialType(CiudadDTO) {}
