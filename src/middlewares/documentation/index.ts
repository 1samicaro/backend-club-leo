import swaggerJSDoc, { type OAS3Definition, type OAS3Options } from 'swagger-jsdoc'

import responses from './responses'
import schemas from './schemas'

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.3',
  info: {
    title: 'club-leo Api',
    version: '0.0.1'
  },
  servers: [
    {
      url: 'https://club-leo-ff62aecb8180.herokuapp.com'
    },
    {
      url: 'http://localhost:4000'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    responses,
    schemas
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/modules/**/docs/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
