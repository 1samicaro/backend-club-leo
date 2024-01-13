import type { Request, Response, NextFunction } from 'express'

import Log from '../../middlewares/logger'

export const verifyVersion = (req: Request, res: Response, next: NextFunction): void => {
  const { VERSION } = process.env
  const version = req.header('Version') as string

  if (version !== VERSION) {
    Log.warn('Wrong app version ' + version)
    res.status(426).json({ message: 'Wrong app version' })
  } else next()
}
