import { body } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateCategory = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  body('image', 'Image not valid')
    .exists()
    .isString(),
  body('isService', 'isService not valid')
    .exists()
    .isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const categoriesValidator = { validateCreateCategory }

export default categoriesValidator
