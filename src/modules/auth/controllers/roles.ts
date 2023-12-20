import type { Request } from 'express'

import rolesServices from '../services/roles'
import type { Role } from '../types/roles'
import type { UserAuthenticated } from '../types/users'

const listRoles = async (): Promise<Role[]> => {
  const roles = await rolesServices.getRoles()
  return roles
}

const createRoles = async (req: Request): Promise<Role> => {
  const data = req.body
  const newRole = await rolesServices.postRole(data)

  return newRole
}

const roleInfo = async (req: Request): Promise<Role> => {
  const id = req.params.id
  const role = await rolesServices.getRoleById(parseInt(id))

  return role
}

export const authorizeUser = async (req: Request, permissionRequired: string): Promise<boolean> => {
  const { RoleId } = req.user as UserAuthenticated
  const role = await rolesServices.getRoleById(parseInt(RoleId))

  if (role.name === 'Root') {
    return true
  }

  if (role.permissions.includes(permissionRequired)) {
    return true
  }

  return false
}

const rolesController = { createRoles, listRoles, roleInfo }

export default rolesController
