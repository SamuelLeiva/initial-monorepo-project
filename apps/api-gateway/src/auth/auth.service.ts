import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private userClient: ClientProxy;

  constructor() {
    this.userClient = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'user_queue',
        queueOptions: { durable: false },
      },
    });
  }

  registerUser(dto: RegisterDto): Observable<any> {
    return this.userClient.send('register_user', dto);
  }

  loginUser(dto: LoginDto): Observable<any> {
    return this.userClient.send('login_user', dto);
  }

  getProfile(token: string): Observable<any> {
    return this.userClient.send('get_user_me', { token });
  }
}
