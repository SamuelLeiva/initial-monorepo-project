import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto): Observable<any> {
    return this.authService.registerUser(body);
  }

  @Post('login')
  login(@Body() body: LoginDto): Observable<any> {
    return this.authService.loginUser(body);
  }

  @Get('me')
  me(@Headers('authorization') authHeader: string): Observable<any> {
    const token = authHeader?.split(' ')[1];
    return this.authService.getProfile(token);
  }
}
