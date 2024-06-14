import { Response } from 'express'
import { CreateUserDto } from '~/entities/users/createUser.dto'
import { BaseResponse } from '~/type/BaseResponse'
import { LoginDto } from '~/entities/users/login.dto'
import { TokenData } from '~/entities/tokenjwt/tokenData.interface'
import User from '~/entities/users/user.interface'
import AuthService from '~/services/auth.service'
import Controller from '~/decorator/controllerDecorator/controller.decorator'
import { Post } from '~/decorator/controllerDecorator/methods.decorator'
import { Validate } from '~/decorator/validateDecorator/validate.decorator'
import { Body, Res } from '~/decorator/common/parameter.decorator'

@Controller('/api/v1/auth')
class AuthenticationController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  @Post('/register')
  @Validate(CreateUserDto)
  public async registration(@Body() userData: CreateUserDto, @Res() response: Response) {
    const user = await this.authService.registerService(userData)

    response.setHeader('Set-Cookie', [this.createCookie(user.tokenData)])

    return new BaseResponse<{ user: User; tokenData: TokenData }>(user)
  }

  @Post('/login')
  public async loggingIn(@Body() loginData: LoginDto, @Res() response: Response) {
    const res = await this.authService.login(loginData)

    response.setHeader('Set-Cookie', [this.createCookie(res.tokenData)])

    return new BaseResponse<{ user: User; tokenData: TokenData }>(res)
  }

  @Post('/refreshToken')
  public async refreshToken() {}

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}; Path=/; Secure; SameSite=Strict`
  }
}

export default AuthenticationController
