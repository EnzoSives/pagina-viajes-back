import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Imagen } from 'src/imagenes/entities/imagen.entity';
import { PreferenciaUsuario } from 'src/preferencia-usuario/entities/preferencia-usuario.entity';
export declare class Lugar {
    id: number;
    nombre: string;
    descripcion: string;
    puntuacion: number;
    url_image1: string;
    url_image2: string;
    url_image3: string;
    url_image4: string;
    ciudad: Ciudad;
    imagenes: Imagen[];
    preferenciaUsuario: PreferenciaUsuario[];
    constructor(nombre: string, description: string, puntuacion: number);
    getIdLugar(): number;
    getNombre(): string;
    setNombre(nombre: string): void;
}
