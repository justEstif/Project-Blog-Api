import { Request, Response, NextFunction, Router } from 'express'
import bcryptjs from 'bcryptjs'
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException'
import WrongCredentialsException from '../exceptions/WrongCredentialsException'
import validationMiddleware from '../middleware/validation.middleware'
import IController from '../interface/controller.interface'
import CreateUserDto from '../users/user.dto'
import UserModel from '../users/user.model'
import LogInDto from './logIn.dto'

class AuthenticationController implements IController {
  public path = '/api'
  public path_register = `${this.path}/register`
  public path_login = `${this.path}/login`
  public router = Router()
  public userModel = UserModel

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

  private async registration(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userData: CreateUserDto = request.body
    // TODO: Move change user exist to the user.dto
    if (await this.userModel.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email))
    } else {
      bcryptjs.hash(userData.password, 10, async (_, hashedPassword) => {
        const user = await this.userModel.create({
          ...userData,
          password: hashedPassword // adding hashed pw to db
        })
        user.password = undefined // clearing user pw from response
        response.status(201).json({
          Message: 'Registration successful',
          User: user
        })
      })
    }
  }

  private async loggingIn(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const logInData: LogInDto = request.body
    const user = await this.userModel.findOne({ email: logInData.email })
    if (user && user.password) {
      bcryptjs.compare(logInData.password, user.password, function (error) {
        if (error) {
          next(new WrongCredentialsException())
        } else {
          user.password = undefined // clearing user pw from response
          response.status(200).json({
            Message: 'Login successful',
            User: user
          })
        }
      })
    } else {
      next(new WrongCredentialsException())
    }
  }
}

export default AuthenticationController
