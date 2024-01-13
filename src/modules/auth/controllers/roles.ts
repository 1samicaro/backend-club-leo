import type { Request } from 'express'

import type { Role } from '../types/roles'
import { models } from '../../../database'

const listRoles = async (): Promise<Role[]> => {
  const roles = await models.Roles.findAll()
  return roles
}

const createRoles = async (req: Request): Promise<Role> => {
  const newRole = await models.Roles.create({
    name: req.body.name
  }) as Role

  return newRole
}

const rolesController = { createRoles, listRoles }

export default rolesController
