import { body, query } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateCity = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  body('CountryId', 'Country not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const validateListCities = [
  query('CountryId', 'Country not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const citiesValidator = { validateCreateCity, validateListCities }

export default citiesValidator
