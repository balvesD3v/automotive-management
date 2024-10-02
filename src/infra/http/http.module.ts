import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateCustomerService } from '@/domain/application/service/create-customer.service'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController],
  providers: [CreateCustomerService],
})
export class HttpModule {}
