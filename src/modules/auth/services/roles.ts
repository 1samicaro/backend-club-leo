import type { Role } from '../types/roles'
import { models } from '../../../database'

const getRoles = async (): Promise<Role[]> => {
  const roles = await models.Roles.findAll({
    attributes: ['id', 'name', 'isPossibleToCreate']
  })
  return roles
}

const postRole = async (data: Role): Promise<Role> => {
  const newRole = await models.Roles.create(data) as Role

  return newRole
}

const getRoleById = async (id: number): Promise<Role> => {
  const role = await models.Roles.findByPk(id, { raw: true })
  return role
}

const rolesServices = { postRole, getRoles, getRoleById }

export default rolesServices
