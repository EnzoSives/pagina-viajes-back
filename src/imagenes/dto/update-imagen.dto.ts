import { PartialType } from '@nestjs/mapped-types';
import { ImagenDTO } from './create-imagen.dto';

export class UpdateImageneDto extends PartialType(ImagenDTO) {}
