/// <reference types="multer" />
import { CiudadService } from './ciudad.service';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/create-ciudad.dto';
export declare class CiudadController {
    private readonly ciudadService;
    constructor(ciudadService: CiudadService);
    getCities(): Promise<Ciudad[]>;
    getId(id: number): Promise<Ciudad>;
    addLugar(files: Express.Multer.File[], CiudadDTO: CiudadDTO): Promise<Ciudad>;
    updateCiudadId(id: number, ciudad: CiudadDTO): Promise<Ciudad>;
    deleteCiudad(id: number): Promise<boolean>;
}
