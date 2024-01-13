const schemas = {
  newOffer: {
    type: 'object',
    required: ['name', 'image', 'url', 'CityId'],
    properties: {
      name: {
        type: 'string'
      },
      image: {
        type: 'string'
      },
      url: {
        type: 'string'
      },
      CityId: {
        type: 'integer'
      }
    }
  },
  newLoan: {
    type: 'object',
    required: ['amount', 'numberOfQuotas'],
    properties: {
      amount: {
        type: 'integer'
      },
      numberQuotas: {
        type: 'integer'
      }
    }
  }
}

export default schemas
