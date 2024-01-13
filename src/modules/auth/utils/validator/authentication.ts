import { body } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateAuthentication = [
  body('email', 'Email not valid')
    .exists()
    .isEmail()
    .isLength({ min: 3, max: 40 })
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
