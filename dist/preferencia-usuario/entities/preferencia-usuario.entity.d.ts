import { Lugar } from 'src/lugar/entities/lugar.entity';
import { User } from 'src/users/entities/user.entity';
export declare class PreferenciaUsuario {
    id: number;
    puntaje: number;
    user: User;
    lugar: Lugar;
}
