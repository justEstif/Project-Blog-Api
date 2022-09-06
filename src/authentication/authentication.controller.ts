import {
  Request,
  Response,
  NextFunction,
  Router,
  RequestHandler
} from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserAlreadyExistsException from '../exception/UserAlreadyExistsException'
import WrongCredentialsException from '../exception/WrongCredentialsException'
import validationMiddleware from '../middleware/validation.middleware'
import UserModel from '../user/user.model' // model
import CreateUserDto from '../user/user.dto' // dtos
import LogInDto from './logIn.dto'
import IController from '../interface/controller.interface' // interfaces
import TokenData from '../interface/tokenData.interface'
import endpoints from '../utils/endpoints'
import DataStoredInToken from '../interface/dataStoredInToken'
import IUser from '../user/user.interface'

class AuthenticationController implements IController {
  public path = '/api'
  public path_register = `${this.path}/register`
  public path_login = `${this.path}/login`
  public path_logout = `${this.path}/logout`
  public router = Router()

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

  private async registration(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userData: CreateUserDto = request.body

    const user = await UserModel.findOne({
      $or: [{ email: userData.email }, { username: userData.username }]
    })

    if (user && user.email === userData.email) {
      next(new UserAlreadyExistsException('email', userData.email))
    } else if (user && user.username === userData.username) {
      next(new UserAlreadyExistsException('username', userData.username))
    } else {
      bcryptjs.hash(userData.password, 10, async (_, hashedPassword) => {
        const user = await UserModel.create({
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
    const user = await UserModel.findOne({ email: logInData.email })
    if (user && user.password) {
      const self = this // TODO: use bind here
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
              Token: tokenData // QUESTION: is this required
            })
        }
      })
    } else {
      next(new WrongCredentialsException())
    }
  }

  private loggingOut: RequestHandler = (_, response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0'])
    response.send(200)
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  }

  private createToken(user: IUser): TokenData {
    const expiresIn = 24 * 60 * 60 // a day
    const secret = endpoints.JWT_SECRET
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id // only stores the current users id
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn })
    }
  }
}

export default AuthenticationController
