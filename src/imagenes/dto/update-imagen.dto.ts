import { PartialType } from '@nestjs/mapped-types';
import { CreateImageneDto } from './create-imagen.dto';

export class UpdateImageneDto extends PartialType(CreateImageneDto) {}
