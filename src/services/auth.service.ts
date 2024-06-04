import { CreateUserDto } from '~/entities/users/createUser.dto'
import UserWithThatEmailAlreadyExistsException from '~/exceptions/conflictExceptions/UserWithThatEmailAlreadyExistsException'
import userModel from '~/models/database/user.modle'
import * as bcrypt from 'bcrypt'
import User from '~/entities/users/user.interface'
import { TokenData } from '~/entities/tokenjwt/tokenData.interface'
import DataStoredInToken from '~/entities/tokenjwt/dataStoredInToken.interface'
import * as jwt from 'jsonwebtoken'
import { LoginDto } from '~/entities/users/login.dto'
import WrongCredentialsException from '~/exceptions/unauthorizedExceptions/WrongCredentialsException'

class AuthService {
  private user = userModel

  public registerService = async (userData: CreateUserDto) => {
    const check = await this.user.findOne({ email: userData.email })
    if (check) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email)
    }

    const hashedPassword = await this.hashPassword(userData.password)

    const user = await this.user.create({
      ...userData,
      password: hashedPassword
    })

    const tokenData = this.createToken(user)

    user.refreshToken = tokenData.refreshToken
    await user.save()

    return {
      user,
      tokenData
    }
  }

  public login = async (loginData: LoginDto) => {
    const user = await this.user.findOne({ email: loginData.email })
    if (!user) {
      throw new WrongCredentialsException()
    }
    const isPasswordMatching = await bcrypt.compare(loginData.password, user.password)

    if (!isPasswordMatching) {
      throw new WrongCredentialsException()
    }

    const tokenData = this.createToken(user)

    return {
      user,
      tokenData
    }
  }

  private createToken(user: User): TokenData {
    const expiresIn = +(process.env.TOKEN_EXPIRES || 60 * 60) // an hour

    const refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES
    const secret = process.env.JWT_SECRET || 'secret'
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
      email: user.email
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
      refreshToken: jwt.sign(dataStoredInToken, secret, { expiresIn: refreshExpiresIn })
    }
  }

  private async hashPassword(password: string) {
    try {
      const saltRound = 1
      const salt = await bcrypt.genSalt(saltRound)
      const hash = await bcrypt.hash(password, salt)
      return hash
    } catch (error) {
      throw new Error(error as any)
    }
  }
}

export default AuthService
