import { User } from "src/users/entities/user.entity";
export declare class Blog {
    id: number;
    posteo: string;
    user: User;
    constructor(posteo: string);
}
