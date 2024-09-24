import { Customer } from '@/domain/enterprise/customer'

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
  abstract findByEmail(email: string): Promise<Customer | null>
}
