import { Router, type Request, type Response } from 'express'
import passport from 'passport'

import Log from '../../../middlewares/logger'

import categoriesController from '../controllers/categories'
import categoriesValidator from '../utils/validator/categories'
import { authorizeUser } from '../../auth/controllers/roles'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await categoriesController.listCategories(req)
    res.status(200).json(categories)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting categories' })
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), categoriesValidator.validateCreateCategory, async (req: Request, res: Response): Promise<void> => {
  try {
    const isAuthorized = await authorizeUser(req, 'create:resources')

    if (!isAuthorized) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const newCategory = await categoriesController.createCategory(req)
    res.status(201).json(newCategory)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error creating category' })
  }
})

router.get('/list/:categoryId/:cityId', async (req: Request, res: Response) => {
  try {
    const users = await categoriesController.listUsersByCategoryAndCity(req)
    res.status(200).json(users)
  } catch (error) {
    Log.error(error)
    res.status(400).json({ message: 'Error getting users' })
  }
})

export default router
