import { CreateCustomerService } from '@/domain/application/service/create-customer.service'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validations.pipe'
import { Public } from '@/infra/auth/public'
import { z } from 'zod'
import { WrongCredentialsError } from '@/domain/application/service/errors/wrong-credentials-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountSchema = z.infer<typeof createAccountBodySchema>

@Controller('create-account')
@Public()
export class CreateAccountController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountSchema) {
    const { name, email, password } = createAccountBodySchema.parse(body)

    const result = await this.createCustomerService.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
