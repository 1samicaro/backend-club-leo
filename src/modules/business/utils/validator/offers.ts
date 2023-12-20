import { body, param } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

import validator from '../../../../middlewares/validator'

const validateCreateOffers = [
  body('name', 'Name not valid')
    .exists()
    .isString()
    .isLength({ min: 3, max: 40 })
    .trim()
    .escape(),
  body('image', 'Image not valid')
    .exists()
    .isString()
    .isLength({ min: 3 }),
  body('url', 'url not valid')
    .exists()
    .isString()
    .isLength({ min: 3 }),
  body('CityId', 'CityId not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const deleteOffer = [
  param('id', 'Id not valid')
    .exists()
    .isInt()
    .toInt(),
  (req: Request, res: Response, next: NextFunction) => {
    validator(req, res, next)
  }
]

const offersValidator = { validateCreateOffers, deleteOffer }

export default offersValidator
