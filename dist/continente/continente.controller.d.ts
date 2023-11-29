import { ContinenteService } from './continente.service';
import { ContinenteDTO } from './dto/create-continente.dto';
import { Continente } from './entities/continente.entity';
export declare class ContinenteController {
    private readonly continenteService;
    constructor(continenteService: ContinenteService);
    getCont(): Promise<Continente[]>;
    getId(id: number): Promise<Continente>;
    addCiudad(continente: ContinenteDTO): Promise<Continente>;
    updateCiudadId(id: number, continente: ContinenteDTO): Promise<Continente>;
    deleteCiudad(id: number): Promise<boolean>;
}
