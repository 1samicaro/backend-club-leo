import type { Request } from 'express'

import type { DocumentType } from '../types/documentTypes'
import { models } from '../../../database'

const listDocumentTypes = async (req: Request): Promise<DocumentType[]> => {
  const { countryId, personTypeId } = req.query
  const documentTypes = await models.DocumentTypes.findAll({
    where: { CountryId: countryId, PersonTypeId: personTypeId }
  })

  return documentTypes
}

const createDocumentType = async (req: Request): Promise<DocumentType> => {
  const newDocumentType = await models.DocumentTypes.create({
    name: req.body.name,
    label: req.body.label,
    CountryId: req.body.countryId,
    PersonTypeId: req.body.personTypeId
  }) as DocumentType

  return newDocumentType
}

const documentTypesController = { createDocumentType, listDocumentTypes }

export default documentTypesController
