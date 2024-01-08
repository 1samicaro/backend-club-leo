import type { Request, Response, NextFunction } from 'express'

export const verifyVersion = (req: Request, res: Response, next: NextFunction): void => {
  next()
}
