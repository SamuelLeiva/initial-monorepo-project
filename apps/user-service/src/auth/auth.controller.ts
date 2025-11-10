import {
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokenDto } from './dto/token.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register_user')
  register(@Payload() data: RegisterDto) {
    return this.authService.register(data.email, data.password, data.name);
  }

  @MessagePattern('login_user')
  login(@Payload() data: LoginDto) {
    return this.authService.login(data.email, data.password);
  }

  @MessagePattern('get_user_me')
  getMe(@Payload() payload: TokenDto) {
    return this.authService.getMe(payload.token);
  }
}
