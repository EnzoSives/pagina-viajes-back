/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Pais } from './entities/pais.entity';
import { PaisDTO } from './dto/create-pais.dto';
import { Continente } from 'src/continente/entities/continente.entity';
export declare class PaisService {
    private paisRepository;
    private continenteRepository;
    constructor(paisRepository: Repository<Pais>, continenteRepository: Repository<Continente>);
    private readonly uploadsPath;
    getAll(): Promise<Pais[]>;
    getId(id: number): Promise<Pais>;
    agregarPais(paisDTO: PaisDTO, files: Express.Multer.File[]): Promise<Pais>;
    private generateImageUrl;
    private saveImageToServer;
    updatePaisId(id: number, paisDTO: PaisDTO): Promise<Pais>;
    deletePais(id: number): Promise<boolean>;
}
