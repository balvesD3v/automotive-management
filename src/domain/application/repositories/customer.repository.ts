import { Customer } from '@/domain/enterprise/customer'

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>
  abstract findById(id: string): Promise<Customer | null>
}
