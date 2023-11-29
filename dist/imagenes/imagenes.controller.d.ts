/// <reference types="multer" />
import { ImagenDTO } from './dto/create-imagen.dto';
import { ImagenService } from './imagenes.service';
export declare class ImagenController {
    private readonly imagenService;
    constructor(imagenService: ImagenService);
    subirImagen(file: Express.Multer.File, imagenDTO: ImagenDTO): Promise<import("./entities/imagen.entity").Imagen>;
}
