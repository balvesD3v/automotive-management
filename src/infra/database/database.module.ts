import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CustomerRepository } from '@/domain/application/repositories/customer.repository'
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer.repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  exports: [PrismaService, CustomerRepository],
})
export class DatabaseModule {}
