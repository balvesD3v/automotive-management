import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Customer } from '@/domain/enterprise/customer'
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaCustomerMapper {
  static toDomain(raw: PrismaUser): Customer {
    return Customer.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(customer: Customer): Prisma.UserUncheckedCreateInput {
    return {
      id: customer.id.toString(),
      name: customer.name.toString(),
      email: customer.email.toString(),
      password: customer.password,
    }
  }
}
