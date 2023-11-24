import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Continente } from 'src/continente/entities/continente.entity';
export declare class Pais {
    id: number;
    nombre: string;
    descripcion: string;
    url_image: string;
    puntuacion: number;
    ciudades: Ciudad[];
    continente: Continente;
    constructor(nombre: string, descripcion: string, url_image: string, puntuacion: number);
    getIdPais(): number;
    getNombre(): string;
    setNombre(nombre: string): void;
}
