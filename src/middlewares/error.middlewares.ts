import { NextFunction, Request, Response } from 'express'
import HttpException from '~/exceptions/HttpException'
import { logger } from '~/logger/winston.config'

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  logger.error(`${error.stack}`)
  logger.error(`Body: ${JSON.stringify(request.body)}`)
  logger.error(`Param: ${JSON.stringify(request.params)}`)
  response.status(status).send({
    status,
    message
  })
}

export default errorMiddleware
