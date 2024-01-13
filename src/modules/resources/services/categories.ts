import type { Category } from '../types/categories'
import { models } from '../../../database'

const getCategories = async (): Promise<Category[]> => {
  const categories = await models.Categories.findAll({ raw: true })
  return categories
}

const postCategory = async (data: Category): Promise<Category> => {
  const newCategory: Category = await models.Categories.create(data)

  return newCategory
}

const getCategoriesById = async (id: string): Promise<Category[]> => {
  const categories = await models.Categories.findAll({
    where: { id }
  })
  return categories
}

const categoriesServices = { postCategory, getCategories, getCategoriesById }

export default categoriesServices
