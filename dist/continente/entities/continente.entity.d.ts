import { Pais } from 'src/pais/entities/pais.entity';
export declare class Continente {
    id: number;
    nombre: string;
    descripcion: string;
    paises: Pais[];
    constructor(nombre: string, descripcion: string);
    getIdContinente(): number;
    getNombre(): string;
    setNombre(nombre: string): void;
}
