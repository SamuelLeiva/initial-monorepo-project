import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
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

  pingUserService(): Observable<any> {
    return this.userClient.send('ping_user', {}); // patrón idéntico al user-service
  }
}
