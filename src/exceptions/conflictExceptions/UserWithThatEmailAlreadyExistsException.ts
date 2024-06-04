import { HttpStatusCode } from '~/constants/httpStatus'
import HttpException from '../HttpException'

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(HttpStatusCode.CONFLICT, `Email: ${email} already exists!`)
  }
}

export default UserWithThatEmailAlreadyExistsException
