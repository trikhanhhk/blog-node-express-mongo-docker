import { HttpStatusCode } from '~/constants/httpStatus'
import HttpException from '../HttpException'

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(HttpStatusCode.UNAUTHORIZED, 'Token is not valid')
  }
}

export default WrongAuthenticationTokenException
