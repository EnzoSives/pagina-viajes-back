import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Continente } from 'src/continente/entities/continente.entity';
export declare class Pais {
    id: number;
    nombre: string;
    descripcion: string;
    url_image1: string;
    url_image2: string;
    url_image3: string;
    url_image4: string;
    ciudades: Ciudad[];
    continente: Continente;
    constructor(nombre: string, descripcion: string);
    getIdPais(): number;
    getNombre(): string;
    setNombre(nombre: string): void;
}
