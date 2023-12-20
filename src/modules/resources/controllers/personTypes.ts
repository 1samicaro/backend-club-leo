import type { Request } from 'express'

import personTypesServices from '../services/personTypes'
import type { PersonType } from '../types/personTypes'

const listPersonTypes = async (): Promise<PersonType[]> => {
  const personTypes = await personTypesServices.getPersonTypes()
  return personTypes
}

const createPersonType = async (req: Request): Promise<PersonType> => {
  const name = req.body.name
  const newPersonType = await personTypesServices.postPersonType(name)

  return newPersonType
}

const personTypesController = { createPersonType, listPersonTypes }

export default personTypesController
