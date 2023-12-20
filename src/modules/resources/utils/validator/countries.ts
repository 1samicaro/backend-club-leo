import { body } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateCountry = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  body('code', 'Code not valid')
    .exists()
    .isInt()
    .toInt()
    .isLength({ min: 1, max: 7 }),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const countriesValidator = { validateCreateCountry }

export default countriesValidator
