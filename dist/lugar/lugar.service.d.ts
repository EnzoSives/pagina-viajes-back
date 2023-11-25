/// <reference types="multer" />
import { LugarDTO } from './dto/create-lugar.dto';
import { Lugar } from './entities/lugar.entity';
import { Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
export declare class LugarService {
    private lugarRepository;
    private ciudadRepository;
    constructor(lugarRepository: Repository<Lugar>, ciudadRepository: Repository<Ciudad>);
    private readonly uploadsPath;
    getAll(): Promise<Lugar[]>;
    getId(id: number): Promise<Lugar>;
    agregarLugar(lugarDTO: LugarDTO, files: Express.Multer.File[]): Promise<Lugar>;
    private generateImageUrl;
    private saveImageToServer;
    private saveImageToServerWeb;
    updateLugarId(id: number, lugarDTO: LugarDTO): Promise<Lugar>;
    deleteLugar(id: number): Promise<boolean>;
}
