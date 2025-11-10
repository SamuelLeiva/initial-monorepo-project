import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string) {
    const existing = await this.userService.findByEmail(email);
    if (existing) throw new UnauthorizedException('User already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userService.create({ email, password: hashed, name });
    return { id: user.id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async getMe(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findByEmail(decoded.email);
      return { id: user?.id, email: user?.email, name: user?.name };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
