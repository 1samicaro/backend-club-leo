import { body, query } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateAdditionalTypes = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  body('PersonTypeId', 'PersonTypeId not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const validateListAdditionalTypes = [
  query('PersonTypeId', 'PersonTypeId not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const additionalTypesValidator = { validateCreateAdditionalTypes, validateListAdditionalTypes }

export default additionalTypesValidator
