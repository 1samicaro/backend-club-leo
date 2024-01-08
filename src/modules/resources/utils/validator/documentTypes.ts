import { body, query } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateDocumentType = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  body('label', 'Label nor valid')
    .exists()
    .isString()
    .isLength({ min: 1, max: 3 })
    .trim()
    .escape(),
  body('countryId', 'Country not valid')
    .exists()
    .isInt()
    .toInt(),
  body('personTypeId', 'PersonType not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const validateListDocumentTypes = [
  query('countryId', 'Country not valid')
    .exists()
    .isInt()
    .toInt(),
  query('personTypeId', 'PersonType not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const documentTypesValidator = { validateCreateDocumentType, validateListDocumentTypes }

export default documentTypesValidator
