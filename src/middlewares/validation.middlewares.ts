import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import * as express from 'express'
import HttpException from '../exceptions/HttpException'
import { HttpStatusCode } from '~/constants/httpStatus'

function validationMiddleware<T>(type: any, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    const instance = plainToInstance(type, req.body)
    validate(instance, { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => (error.constraints ? Object.values(error.constraints).join(', ') : ''))
          .join(', ')
        next(new HttpException(HttpStatusCode.BAD_REQUEST, message))
      } else {
        next()
      }
    })
  }
}

export default validationMiddleware
