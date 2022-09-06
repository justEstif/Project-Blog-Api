import {
  Request,
  Response,
  NextFunction,
  Router,
  RequestHandler
} from 'express'
import validationMiddleware from '../middleware/validation.middleware'
import CreateUserDto from '../user/user.dto' // dtos
import LogInDto from './logIn.dto'
import IController from '../interface/controller.interface' // interfaces
import AuthenticationService from './authentication.service'
import asyncHandler from 'express-async-handler'

class AuthenticationController implements IController {
  public path = '/api'
  public path_register = `${this.path}/register`
  public path_login = `${this.path}/login`
  public path_logout = `${this.path}/logout`
  public router = Router()
  public authenticationService = new AuthenticationService()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      this.path_register,
      validationMiddleware(CreateUserDto),
      this.registration
    )
    this.router.post(
      this.path_login,
      validationMiddleware(LogInDto),
      this.loggingIn
    )
    this.router.post(this.path_logout, this.loggingOut)
  }

  private registration = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const userData: CreateUserDto = request.body
      try {
        const { cookie, user } = await this.authenticationService.register(
          userData
        )
        response.status(201).setHeader('Set-Cookie', [cookie]).json({
          Message: 'Registration successful',
          User: user
        })
      } catch (error) {
        next(error)
      }
    }
  )

  private loggingIn = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const logInData: LogInDto = request.body
      try {
        const { cookie, user } = await this.authenticationService.logIn(
          logInData
        )
        response.status(200).setHeader('Set-Cookie', [cookie]).json({
          Message: 'Login successful',
          User: user
        })
      } catch (error) {
        next(error)
      }
    }
  )

  private loggingOut: RequestHandler = (_, response) => {
    const cookie = this.authenticationService.logOut()
    response
      .status(200)
      .setHeader('Set-Cookie', [`${cookie}`])
      .json({
        Message: 'Logout successful'
      })
  }
}

export default AuthenticationController
