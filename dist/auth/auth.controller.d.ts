import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("../users/dto/create-user.dto").CreateUserDto & import("../users/entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        email: string;
        id: number;
    }>;
    getUser(req: any): Promise<{
        user: import("../users/entities/user.entity").User;
    }>;
}
