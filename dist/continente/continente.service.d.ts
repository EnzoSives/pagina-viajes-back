import { ContinenteDTO } from './dto/create-continente.dto';
import { Continente } from './entities/continente.entity';
import { Repository } from 'typeorm';
export declare class ContinenteService {
    private continenteRepository;
    constructor(continenteRepository: Repository<Continente>);
    getAll(): Promise<Continente[]>;
    getId(id: number): Promise<Continente>;
    addContinente(continenteDTO: ContinenteDTO): Promise<Continente>;
    updateContinenteId(id: number, continenteDTO: ContinenteDTO): Promise<Continente>;
    deleteContinente(id: number): Promise<boolean>;
}
