import { Global, Module } from '@nestjs/common';
import { PrismaClient } from './generated/client/client';

@Global()
@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useFactory: () => {
        const prisma = new PrismaClient();
        prisma.$connect();
        return prisma;
      },
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class DatabaseModule {}
