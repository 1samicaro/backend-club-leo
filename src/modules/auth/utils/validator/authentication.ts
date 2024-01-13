import { body } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateAuthentication = [
  body('username', 'Username not valid')
    .exists()
    .isLength({ min: 3, max: 20 })
    .trim()
    .escape(),
  body('password', 'Password not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const authenticationValidator = { validateAuthentication }

export default authenticationValidator
