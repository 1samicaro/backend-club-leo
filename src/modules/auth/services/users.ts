import type { User } from '../types/users'
import { models } from '../../../database'
import { Op } from 'sequelize'
import Log from '../../../middlewares/logger'

const getUsers = async (): Promise<User[]> => {
  const users = await models.Users.findAll({
    include: [
      models.DocumentTypes,
      models.Countries,
      models.PersonTypes, models.Roles,
      models.AdditionalTypes,
      { model: models.Users, as: 'Partner', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GrandPartner', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GreatGrandPartner', attributes: ['id', 'username'] },
      models.Categories]
  })
  return users
}

const postUser = async (userData: User): Promise<User> => {
  Log.error('service')
  if (userData?.docs?.length === 0 || userData?.docs === undefined) userData.isVerified = true

  userData.username = userData.username.toLowerCase()

  const newUser = await models.Users.create(userData)

  if (userData.Categories !== undefined) {
    await newUser.setCategories(userData.Categories)
  }
  return newUser as User
}

const getUserById = async (id: string): Promise<User> => {
  const user = await models.Users.findOne({
    where: { id },
    include: [
      models.DocumentTypes,
      models.Countries,
      models.PersonTypes, models.Roles,
      models.AdditionalTypes,
      { model: models.Users, as: 'Partner', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GrandPartner', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GreatGrandPartner', attributes: ['id', 'username'] },
      models.Categories
    ]
  })
  return user
}

const getUserByUsernameLog = async (username: string): Promise<User> => {
  username = username.toLowerCase()

  const user = await models.Users.findOne({
    where: { username },
    include: [
      models.DocumentTypes,
      models.Countries,
      models.PersonTypes, models.Roles,
      models.AdditionalTypes,
      { model: models.Users, as: 'Partner', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GrandPartner', attributes: ['id', 'username'] },
      { model: models.Users, as: 'GreatGrandPartner', attributes: ['id', 'username'] },
      models.Categories]
  })
  return user
}

const getUserByUserName = async (username: string): Promise<User> => {
  username = username.toLowerCase()

  const user = await models.Users.findOne({
    where: { username },
    attributes: ['id', 'username', 'name', 'remainingReferrals']
  })
  return user
}

const patchUser = async (data: unknown, userData: any): Promise<User> => {
  const user = await userData.set(data)
  await user.save()
  return user
}

const getChildsByUserId = async (id: string): Promise<User[]> => {
  const users = await models.Users.findAll({
    where: { PartnerId: id },
    attributes: ['id', 'username', 'name', 'remainingReferrals']
  })
  return users
}

const getGrandChildsByUserId = async (id: string): Promise<User[]> => {
  const users = await models.Users.findAndCountAll({
    where: { GrandPartnerId: id },
    attributes: ['id', 'username', 'name', 'remainingReferrals']
  })
  return users
}

const getGreatGrandChildsByUserId = async (id: string): Promise<User[]> => {
  const users = await models.Users.findAndCountAll({
    where: { GreatGrandPartnerId: id },
    attributes: ['id', 'username', 'name', 'remainingReferrals']
  })
  return users
}

const searchUsers = async (data: any): Promise<User[]> => {
  const options = []
  if (data.CountryId !== undefined) {
    options.push({ CountryId: data.CountryId })
  }
  if (data.PersonTypeId !== undefined) {
    options.push({ PersonTypeId: data.PersonTypeId })
  }
  if (data.AdditionalTypeId !== undefined) {
    options.push({ AdditionalTypeId: data.AdditionalTypeId })
  }

  const users = await models.Users.findAll({
    where: { [Op.and]: options }
  })
  return users
}

const banUserById = async (id: string): Promise<User> => {
  const user = await models.Users.findOne({
    where: { id }
  })
  user.isBanned = true
  await user.save()
  return user
}

const verifyUserById = async (id: string): Promise<User> => {
  const user = await models.Users.findOne({
    where: { id }
  })
  user.isVerified = true
  await user.save()
  return user
}

const deleteUserById = async (id: string): Promise<User> => {
  const user = await models.Users.findOne({
    where: { id }
  })
  user.isDeleted = true
  await user.save()
  return user
}

const getUsersByCategoryAndCity = async (categoryId: string, cityId: string): Promise<User[]> => {
  const users = await models.Users.findAll({
    include: [
      { model: models.Categories, where: { id: categoryId } },
      { model: models.Cities, where: { id: cityId } }
    ],
    where: { isVerified: true, isBanned: false, isDeleted: false },
    attributes: ['id', 'username', 'name', 'address', 'website', 'description', 'email', 'phone', 'profilePic']
  })
  return users
}

const usersServices = {
  postUser,
  getUsers,
  getUserById,
  getUserByUsernameLog,
  patchUser,
  getUserByUserName,
  getChildsByUserId,
  getGrandChildsByUserId,
  getGreatGrandChildsByUserId,
  searchUsers,
  banUserById,
  verifyUserById,
  deleteUserById,
  getUsersByCategoryAndCity
}

export default usersServices
