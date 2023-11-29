import { Blog } from 'src/blog/entities/blog.entity';
import { PreferenciaUsuario } from 'src/preferencia-usuario/entities/preferencia-usuario.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    deletedAt: Date;
    preferencias: PreferenciaUsuario[];
    blogs: Blog[];
    constructor(username: string, password: string, email: string);
}
