import type { Request, Response, ErrorRequestHandler } from 'express'

import Log from '../../middlewares/logger'

export const error404 = (req: Request, res: Response): void => {
  const url = req.originalUrl
  Log.error("Route didn't exist " + url)
  res.status(404).json({ message: 'Route not found' })
}

export const generalErrorHandler: ErrorRequestHandler = (err, _req, res): void => {
  const status = err.status ?? 500
  const message = err
  Log.error('General error ' + JSON.stringify(message))
  res.status(status).json(message)
}
