import { SexEnum } from '~/constants/enum'

interface User {
  _id: string
  firstName: string
  lastName: string
  displayName: string
  email: string
  password: string
  sex: SexEnum
  refreshToken: string
}

export default User
