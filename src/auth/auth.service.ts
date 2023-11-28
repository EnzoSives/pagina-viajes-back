import { UsersService } from '../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async register({username, password, email}: RegisterDto){
        const user = await this.usersService.findOneByEmail(email);
        if(user){
            throw new BadRequestException('El usuario ya existe');
        }

        return await this.usersService.create({
            username,email,password: await bcrypt.hash(password, 10),
        });
    }

    async login ({ email, password}: LoginDto){
      const user = await this.usersService.findByEmailWithPassword(email);
      if(!user){
          throw new UnauthorizedException('email erroneo');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid){
          throw new UnauthorizedException('password incorrecto');
      }
      // Agrega más propiedades al payload aquí
      const payload = {
          email: user.email, 
          id: user.id,
          name: user.username,
         
          // otras propiedades...
      };
      const access_token = await this.jwtService.signAsync(payload);
  
      return{
          access_token
      };
  }

  async getUserByToken(token: string) {
    try {
        const decodedToken = this.jwtService.verify(token);
        const { email } = decodedToken;
        console.log(this.findUserByEmail(email));
        return this.findUserByEmail(email);
    } catch (error) {
        throw new UnauthorizedException('Token inválido');
    }
}
  

async findUserByEmail(email: string) {
    return this.usersService.findOneByEmail(email);
}
}