import { Request, Response, NextFunction, Router } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException'
import WrongCredentialsException from '../exceptions/WrongCredentialsException'
import validationMiddleware from '../middleware/validation.middleware'
import IController from '../interface/controller.interface'
import CreateUserDto from '../users/user.dto'
import UserModel from '../users/user.model'
import LogInDto from './logIn.dto'
import TokenData from '../interface/tokenData.interface'
import endpoints from '../utils/endpoints'
import DataStoredInToken from '../interface/dataStoredInToken'
import IUser from '../users/user.interface'

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
        const tokenData = this.createToken(user)
        response
          .status(201)
          .setHeader('Set-Cookie', [this.createCookie(tokenData)])
          .json({
            Message: 'Registration successful',
            User: user,
            Token: tokenData // QUESTION: is this required
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
      const self = this
      bcryptjs.compare(logInData.password, user.password, function (error) {
        if (error) {
          next(new WrongCredentialsException())
        } else {
          user.password = undefined // clearing user pw from response
          const tokenData = self.createToken(user)
          response
            .status(200)
            .setHeader('Set-Cookie', [self.createCookie(tokenData)])
            .json({
              Message: 'Login successful',
              User: user,
              Token: tokenData
            })
        }
      })
    } else {
      next(new WrongCredentialsException())
    }
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  }

  private createToken(user: IUser): TokenData {
    const expiresIn = 24 * 60 * 60 // a day
    const secret = endpoints.JWT_SECRET
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    }
  }
}

export default AuthenticationController
