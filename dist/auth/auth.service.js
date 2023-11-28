"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register({ username, password, email }) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new common_1.BadRequestException('El usuario ya existe');
        }
        return await this.usersService.create({
            username, email, password: await bcrypt.hash(password, 10),
        });
    }
    async login({ email, password }) {
        const user = await this.usersService.findByEmailWithPassword(email);
        if (!user) {
            throw new common_1.UnauthorizedException('email erroneo');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('password incorrecto');
        }
        const payload = {
            email: user.email,
            id: user.id,
            name: user.username,
        };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            access_token
        };
    }
    async getUserByToken(token) {
        try {
            const decodedToken = this.jwtService.verify(token);
            const { email } = decodedToken;
            console.log(this.findUserByEmail(email));
            return this.findUserByEmail(email);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
    async findUserByEmail(email) {
        return this.usersService.findOneByEmail(email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map