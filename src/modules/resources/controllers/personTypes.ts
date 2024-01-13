import type { Request } from 'express'

import type { PersonType } from '../types/personTypes'
import { models } from '../../../database'

const listPersonTypes = async (): Promise<PersonType[]> => {
  const personTypes = await models.PersonTypes.findAll()
  return personTypes
}

const createPersonType = async (req: Request): Promise<PersonType> => {
  const newPersonType = await models.PersonTypes.create({
    name: req.body.name
  }) as PersonType

  return newPersonType
}

const personTypesController = { createPersonType, listPersonTypes }

export default personTypesController
