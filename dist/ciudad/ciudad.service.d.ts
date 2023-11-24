import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadDTO } from './dto/create-ciudad.dto';
import { Pais } from 'src/pais/entities/pais.entity';
export declare class CiudadService {
    private ciudadRepository;
    private paisRepository;
    constructor(ciudadRepository: Repository<Ciudad>, paisRepository: Repository<Pais>);
    getAll(): Promise<Ciudad[]>;
    getId(id: number): Promise<Ciudad>;
    addCiudad(ciudadDTO: CiudadDTO): Promise<Ciudad>;
    updateCiudadId(id: number, ciudadDTO: CiudadDTO): Promise<Ciudad>;
    deleteCiudad(id: number): Promise<boolean>;
}
