import type { Request } from 'express'
import type { Offer } from '../types/offers'

import offersServices from '../services/offers'

const listOffers = async (): Promise<Offer[]> => {
  const offers = await offersServices.getOffers()
  return offers
}

const createOffer = async (req: Request): Promise<Offer> => {
  const data = req.body as Offer

  const newOffer = await offersServices.postOffer(data)

  return newOffer
}

const deleteOffer = async (req: Request): Promise<void> => {
  const id = parseInt(req.params.id)

  await offersServices.deleteOffer(id)
}

const listOffersByCity = async (CityId: number): Promise<Offer[]> => {
  const offers = await offersServices.getOffersByCity(CityId)
  return offers
}

const offersController = { createOffer, listOffers, deleteOffer, listOffersByCity }

export default offersController
