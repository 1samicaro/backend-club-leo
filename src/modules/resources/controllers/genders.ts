import type { Request } from 'express'

import type { Gender } from '../types/genders'
import { models } from '../../../database'

const listGenders = async (): Promise<Gender[]> => {
  const genders = await models.Genders.findAll()
  return genders
}

const createGenders = async (req: Request): Promise<Gender> => {
  const newGender = await models.Genders.create({
    name: req.body.name
  }) as Gender

  return newGender
}

const citiesController = { createGenders, listGenders }

export default citiesController
