import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('ping_user')
  handlePingUser() {
    console.log('📨 Received ping from API Gateway');
    return { message: 'User service is alive!' };
  }
}