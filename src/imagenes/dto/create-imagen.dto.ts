// create-imagen.dto.ts

import { IsNotEmpty, IsNumber } from 'class-validator';

export class ImagenDTO {

  @IsNumber()
  @IsNotEmpty()
  idLugar: number;
}

      



