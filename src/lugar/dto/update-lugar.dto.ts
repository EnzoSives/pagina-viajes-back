import { PartialType } from '@nestjs/mapped-types';
import { LugarDTO } from './create-lugar.dto';

export class UpdateLugarDto extends PartialType(LugarDTO) {}
