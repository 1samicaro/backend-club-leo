import { body } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateRoles = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const rolesValidator = { validateCreateRoles }

export default rolesValidator
