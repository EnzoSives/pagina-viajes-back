/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/create-ciudad.dto';
import { Pais } from 'src/pais/entities/pais.entity';
import { Lugar } from 'src/lugar/entities/lugar.entity';
export declare class CiudadService {
    private ciudadRepository;
    private paisRepository;
    private lugarRepository;
    constructor(ciudadRepository: Repository<Ciudad>, paisRepository: Repository<Pais>, lugarRepository: Repository<Lugar>);
    private readonly uploadsPath;
    getAll(): Promise<Ciudad[]>;
    getId(id: number): Promise<Ciudad>;
    agregarCiudad(ciudadDTO: CiudadDTO, files: Express.Multer.File[]): Promise<Ciudad>;
    private generateImageUrl;
    private saveImageToServer;
    updateCiudadId(id: number, ciudadDTO: CiudadDTO): Promise<Ciudad>;
    deleteCiudad(id: number): Promise<boolean>;
}
