import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../repositories/customer.repository'
import { Either, left, right } from '@/core/either'
import { Customer } from '@/domain/enterprise/customer'
import { CustomerAlreadyExistsError } from './errors/customer-already-exists'
import { HashGenerator } from '../cryptography/hash-generator'

interface CreateCustomerServiceRequest {
  name: string
  email: string
  password: string
}

type CreateCustomerServiceResponse = Either<
  CustomerAlreadyExistsError,
  {
    customer: Customer
  }
>

@Injectable()
export class CreateCustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateCustomerServiceRequest): Promise<CreateCustomerServiceResponse> {
    const customerWithSameEmail =
      await this.customerRepository.findByEmail(email)

    if (customerWithSameEmail) {
      return left(new CustomerAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const customer = Customer.create({
      email,
      name,
      password: hashedPassword,
    })

    await this.customerRepository.create(customer)

    return right({
      customer,
    })
  }
}
