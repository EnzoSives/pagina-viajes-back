import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    // console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    // console.log(loginDto);
    return this.authService.login(loginDto);
  }

 
    @Get('user')
    async getUser(@Request() req) {
        // req.user contendrá la información del usuario autenticado
        const { email } = req.body;
        const user = await this.authService.findUserByEmail(email);
        return { user };
        
    }
}