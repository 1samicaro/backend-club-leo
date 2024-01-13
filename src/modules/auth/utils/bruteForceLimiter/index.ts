import rateLimit from 'express-rate-limit'
import type { Request, Response } from 'express'

import Log from '../../../../middlewares/logger'

export const bruteLimiter = rateLimit({
  windowMs: 5 * 60 * 60 * 1000,
  max: 20,
  standardHeaders: false,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] as string ?? req.socket.remoteAddress
    Log.error('Too many failed login attempts from ' + ip)
    res.status(429).json({ message: 'Too many failed login attempts' })
  }
})
