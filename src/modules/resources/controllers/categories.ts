import type { Request } from 'express'

import categoriesServices from '../services/categories'
import usersServices from '../../auth/services/users'
import type { Category } from '../types/categories'

const listCategories = async (req: Request): Promise<Category[]> => {
  const categories = await categoriesServices.getCategories()
  return categories
}

const createCategory = async (req: Request): Promise<Category> => {
  const newCategory = req.body

  const category = await categoriesServices.postCategory(newCategory)

  return category
}

const listUsersByCategoryAndCity = async (req: Request): Promise<any> => {
  const { categoryId, cityId } = req.params
  const users = await usersServices.getUsersByCategoryAndCity(categoryId, cityId)

  return users
}

const categoriesController = { createCategory, listCategories, listUsersByCategoryAndCity }

export default categoriesController
