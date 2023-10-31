import { Injectable } from '@nestjs/common';
import { CreateImageneDto } from './dto/create-imagen.dto';
import { UpdateImageneDto } from './dto/update-imagen.dto';

@Injectable()
export class ImagenesService {
  create(createImageneDto: CreateImageneDto) {
    return 'This action adds a new imagene';
  }

  findAll() {
    return `This action returns all imagenes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagene`;
  }

  update(id: number, updateImageneDto: UpdateImageneDto) {
    return `This action updates a #${id} imagene`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagene`;
  }
}
