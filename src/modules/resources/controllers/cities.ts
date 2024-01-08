import type { Request } from 'express'

import type { City } from '../types/cities'
import { models } from '../../../database'

const listCities = async (req: Request): Promise<City[]> => {
  const { countryId } = req.query
  const cities = await models.Cities.findAll({
    where: { CountryId: countryId }
  })
  return cities
}

const createCities = async (req: Request): Promise<City> => {
  const newCity = await models.Cities.create({
    name: req.body.name,
    CountryId: req.body.countryId
  }) as City

  return newCity
}

const citiesController = { createCities, listCities }

export default citiesController
