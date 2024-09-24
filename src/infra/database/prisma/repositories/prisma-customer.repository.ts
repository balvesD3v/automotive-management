import { CustomerRepository } from '@/domain/application/repositories/customer.repository'
import { Customer } from '@/domain/enterprise/customer'

export class PrismaCustomerRepository implements CustomerRepository {
  create(customer: Customer): Promise<void> {}

  findById(id: string): Promise<Customer | null> {}
}
