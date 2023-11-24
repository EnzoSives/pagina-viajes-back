/// <reference types="multer" />
import { LugarService } from './lugar.service';
import { LugarDTO } from './dto/create-lugar.dto';
import { Lugar } from './entities/lugar.entity';
export declare class LugarController {
    private readonly lugarService;
    constructor(lugarService: LugarService);
    getLugares(): Promise<Lugar[]>;
    getId(id: number): Promise<Lugar>;
    addLugar(files: Express.Multer.File[], lugarDTO: LugarDTO): Promise<Lugar>;
    updateLugarId(id: number, lugar: LugarDTO): Promise<Lugar>;
    deleteLugar(id: number): Promise<boolean>;
}
