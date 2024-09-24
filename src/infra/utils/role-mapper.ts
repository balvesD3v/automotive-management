import { Role } from '@/domain/enterprise/role/enum.roles'
import { Roles as PrismaRoles } from '@prisma/client'

export class RoleMapper {
  static mapRoleToDomain(role: string): Role {
    switch (role.toLowerCase()) {
      case 'customer':
        return Role.CUSTOMER

      case 'admin':
        return Role.ADMIN

      default:
        throw new Error(`Role ${role} is not valid`)
    }
  }

  static mapRoleToPrisma(role: Role): PrismaRoles {
    switch (role) {
      case Role.ADMIN:
        return PrismaRoles.ADMIN
      case Role.CUSTOMER:
        return PrismaRoles.CUSTOMER
      default:
        throw new Error(`Role ${role} is not valid`)
    }
  }
}
