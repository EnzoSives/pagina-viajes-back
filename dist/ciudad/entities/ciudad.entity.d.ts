import { Lugar } from 'src/lugar/entities/lugar.entity';
import { Pais } from 'src/pais/entities/pais.entity';
export declare class Ciudad {
    id: number;
    nombre: string;
    descripcion: string;
    url_image1: string;
    url_image2: string;
    url_image3: string;
    url_image4: string;
    pais: Pais;
    lugares: Lugar[];
    constructor(nombre: string, descripcion: string);
    getIdCiudad(): number;
    getNombre(): string;
    setNombre(nombre: string): void;
}
