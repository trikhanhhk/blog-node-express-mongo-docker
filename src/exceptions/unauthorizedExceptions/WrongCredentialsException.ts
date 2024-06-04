import { HttpStatusCode } from '~/constants/httpStatus'
import HttpException from '../HttpException'

class WrongCredentialsException extends HttpException {
  constructor() {
    super(HttpStatusCode.UNAUTHORIZED, 'Invalid username or password')
  }
}

export default WrongCredentialsException
