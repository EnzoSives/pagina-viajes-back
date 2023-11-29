import { User } from "src/users/entities/user.entity";
export declare class Blog {
    id: number;
    posteo: string;
    nombre: string;
    url_imagen: string;
    user: User;
    constructor(posteo: string, nombre: string);
}
