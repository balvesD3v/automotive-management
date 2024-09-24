import { CustomerRepository } from '@/domain/application/repositories/customer.repository'
import { Customer } from '@/domain/enterprise/customer'
import { PrismaService } from '../prisma.service'
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mappers'

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: Customer): Promise<void> {
    const data = PrismaCustomerMapper.toPrisma(customer)

    await this.prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomain(customer)
  }
}
