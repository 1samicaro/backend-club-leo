import { models } from '../../../database'
import type { Offer } from '../types/offers'

const getOffers = async (): Promise<Offer[]> => {
  const offers = await models.Offers.findAll({ })
  return offers
}

const postOffer = async (data: Offer): Promise<Offer> => {
  const newOffer = await models.Offers.create(data) as Offer
  return newOffer
}

const deleteOffer = async (id: number): Promise<void> => {
  await models.Offers.destroy({ where: { id } })
}

const getOffersByCity = async (CityId: number): Promise<Offer[]> => {
  const offers = await models.Offers.findAll({ where: { CityId } })
  return offers
}

const offersServices = { postOffer, getOffers, deleteOffer, getOffersByCity }

export default offersServices
