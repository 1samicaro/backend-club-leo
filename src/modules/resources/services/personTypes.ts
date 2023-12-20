import type { PersonType } from '../types/personTypes'
import { models } from '../../../database'

const getPersonTypes = async (): Promise<PersonType[]> => {
  const personTypes = await models.PersonTypes.findAll()
  return personTypes
}

const postPersonType = async (name: string): Promise<PersonType> => {
  const newPersonType = await models.PersonTypes.create({ name }) as PersonType

  return newPersonType
}

const personTypesServices = { postPersonType, getPersonTypes }

export default personTypesServices
