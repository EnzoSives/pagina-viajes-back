/// <reference types="multer" />
import { PaisService } from './pais.service';
import { Pais } from './entities/pais.entity';
import { PaisDTO } from './dto/create-pais.dto';
export declare class PaisController {
    private readonly paisService;
    constructor(paisService: PaisService);
    getLugares(): Promise<Pais[]>;
    getId(id: number): Promise<Pais>;
    addLugar(files: Express.Multer.File[], PaisDTO: PaisDTO): Promise<Pais>;
    updatePaisId(id: number, pais: PaisDTO): Promise<Pais>;
    deletePais(id: number): Promise<boolean>;
}
