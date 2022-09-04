import bcryptjs from 'bcryptjs'
import * as express from 'express'
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException'
import WrongCredentialsException from '../exceptions/WrongCredentialsException'
import IController from '../interface/controller.interface'
import validationMiddleware from '../middleware/validation.middleware'
import UserModel from './../users/user.model'
import CreateUserDto from '../users/user.dto'
import LogInDto from './logIn.dto'

class AuthenticationController implements IController {
  public path = '/api'
  public path_register = '/api/register'
  public path_login = '/api/login'
  public router = express.Router()

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
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: CreateUserDto = request.body
    if (await UserModel.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email))
    } else {
      bcryptjs.hash(userData.password, 10, async (_, hashedPassword) => {
        const user = await UserModel.create({
          ...userData,
          password: hashedPassword
        })
        user.password = undefined
        response.send(user)
      })
    }
  }

  private loggingIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const logInData: LogInDto = request.body
    const user = await UserModel.findOne({ email: logInData.email })
    if (user && user.password) {
      bcryptjs.compare(logInData.password, user.password, function (error) {
        if (error) {
          next(new WrongCredentialsException())
        } else {
          user.password = undefined
          response.send(user)
        }
      })
    } else {
      next(new WrongCredentialsException())
    }
  }
}

export default AuthenticationController
