import type { Request } from 'express'

import type { User } from '../types/users'
import { models } from '../../../database'
import { encrypt } from '../utils/encrypt'

const listUsers = async (): Promise<User[]> => {
  const users = await models.Users.findAll({
    attributes: ['id', 'name', 'documentNumber', 'birthDate', 'email', 'phone', 'isComplete', 'isVerified', 'isBanned', 'isDeleted', 'createdAt', 'updatedAt'],
    include: [models.DocumentTypes, models.Countries, models.Cities, models.PersonTypes, models.Roles]
  })
  return users
}

const createUsers = async (req: Request): Promise<User> => {
  const hash = await encrypt(req.body.password)

  const newUser = await models.Users.create({
    name: req.body.name,
    email: req.body.email,
    documentNumber: req.body.documentNumber,
    password: hash,
    phone: req.body.phone,
    birthDate: req.body.birthDate,
    DocumentTypeId: req.body.documentTypeId,
    CountryId: req.body.countryId,
    CityId: req.body.cityId,
    PersonTypeId: req.body.personTypeId,
    RoleId: req.body.roleId
  })

  const { password, ...user } = newUser.dataValues

  return user
}

const userInfo = async (req: Request): Promise<User> => {
  const user = await models.Users.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'name', 'documentNumber', 'birthDate', 'email', 'phone', 'isComplete', 'isVerified', 'isBanned', 'isDeleted', 'createdAt', 'updatedAt'],
    include: [models.DocumentTypes, models.Countries, models.Cities, models.PersonTypes, models.Roles]
  })
  return user
}

const usersController = { createUsers, listUsers, userInfo }

export default usersController
