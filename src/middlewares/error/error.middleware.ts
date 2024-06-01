import { NextFunction, Request, Response } from 'express'
import { logger } from 'src/logger/winston.config'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  logger.error(err.stack)
  res.status(err.stack)

  res.json({
    message: err.message,
    error: process.env.NODE_ENV != 'production' ? err : {}
  })
  
  next()
}

export default errorHandler
