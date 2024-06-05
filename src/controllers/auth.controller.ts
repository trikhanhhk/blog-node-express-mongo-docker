import { Request, Response } from 'express'
import { CreateUserDto } from '~/entities/users/createUser.dto'
import { BaseResponse } from '~/type/BaseResponse'
import { LoginDto } from '~/entities/users/login.dto'
import { TokenData } from '~/entities/tokenjwt/tokenData.interface'
import User from '~/entities/users/user.interface'
import AuthService from '~/services/auth.service'
import Controller from '~/decorator/controllerDecorator/controller.decorator'
import { Post } from '~/decorator/controllerDecorator/methods.decorator'

@Controller('/api/v1/auth')
class AuthenticationController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  @Post('/register')
  public registration = async (request: Request, response: Response) => {
    const userData: CreateUserDto = request.body

    const user = await this.authService.registerService(userData)

    response.setHeader('Set-Cookie', [this.createCookie(user.tokenData)])

    return new BaseResponse<{ user: User; tokenData: TokenData }>(user)
  }

  @Post('/login')
  public loggingIn = async (request: Request, response: Response) => {
    const loginData: LoginDto = request.body

    const res = await this.authService.login(loginData)

    response.setHeader('Set-Cookie', [this.createCookie(res.tokenData)])

    return new BaseResponse<{ user: User; tokenData: TokenData }>(res)
  }

  @Post('/refreshToken')
  private refreshToken = async (request: Request, response: Response) => {}

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/; Secure; SameSite=Strict`
  }
}

export default AuthenticationController
