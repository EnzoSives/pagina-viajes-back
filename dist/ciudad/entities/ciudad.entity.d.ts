import { Lugar } from 'src/lugar/entities/lugar.entity';
import { Pais } from 'src/pais/entities/pais.entity';
export declare class Ciudad {
    id: number;
    nombre: string;
    descripcion: string;
    pais: Pais;
    lugares: Lugar[];
    constructor(nombre: string, descripcion: string);
    getIdCiudad(): number;
    getNombre(): string;
    setNombre(nombre: string): void;
}
