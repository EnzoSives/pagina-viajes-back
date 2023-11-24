import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register({ username, password, email }: RegisterDto): Promise<import("../users/dto/create-user.dto").CreateUserDto & import("../users/entities/user.entity").User>;
    login({ email, password }: LoginDto): Promise<{
        access_token: string;
        email: string;
    }>;
    getUserByToken(token: string): Promise<import("../users/entities/user.entity").User>;
    findUserByEmail(email: string): Promise<import("../users/entities/user.entity").User>;
}
