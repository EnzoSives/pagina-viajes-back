/// <reference types="multer" />
import { Repository } from 'typeorm';
import { ImagenDTO } from './dto/create-imagen.dto';
import { Imagen } from './entities/imagen.entity';
import { Lugar } from 'src/lugar/entities/lugar.entity';
export declare class ImagenService {
    private readonly imagenRepository;
    private readonly lugarRepository;
    constructor(imagenRepository: Repository<Imagen>, lugarRepository: Repository<Lugar>);
    guardarImagen(file: Express.Multer.File, imagenDTO: ImagenDTO): Promise<Imagen>;
    private generateImageUrl;
    private saveImageToServer;
}
