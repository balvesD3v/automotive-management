import { CreateCustomerService } from '@/domain/application/service/create-customer.service'
import { Controller, HttpCode, Post } from '@nestjs/common'

@Controller('create-account')
export class CreateAccountController {
    constructor(private readonly createCustomerService: CreateCustomerService) {}

    @Post()
    @HttpCode(201)

}
