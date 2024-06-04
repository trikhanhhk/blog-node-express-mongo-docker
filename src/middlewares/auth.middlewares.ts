import { NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import DataStoredInToken from '~/entities/tokenjwt/dataStoredInToken.interface'
import WrongAuthenticationTokenException from '~/exceptions/unauthorizedExceptions/WrongAuthenticationTokenException'
import RequestWithUser from '~/interface/requestWithUser.interface'
import userModel from '~/models/database/user.modle'

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET || 'secret'
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken
      const id = verificationResponse._id
      const user = await userModel.findById(id)

      if (user) {
        request.user = user
        next()
      } else {
        next(new WrongAuthenticationTokenException())
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException())
    }
  } else {
    next(new WrongAuthenticationTokenException())
  }
}

export default authMiddleware
