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
import passport from 'passport'

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

  // @desc Register a user
  // @route POST /api/register
  // @access public
  private registration = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
      const userData: CreateUserDto = request.body
      try {
        const { user, token } = await this.authenticationService.register(
          userData
        )
        request.login(user, { session: false }, (err) => {
          // login user after signup
          if (err) {
            // TODO: Throw error here
            response.send(err)
          } else {
            response.json({ user, token })
          }
        })
      } catch (error) {
        next(error)
      }
    }
  )

  // @desc Login a user
  // @route POST /api/login
  // @access public
  private loggingIn: RequestHandler = (request, response) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        // TODO: Throw error here
        response.status(400).json({
          message: 'Something is not right',
          user: user
        })
      } else {
        request.login(user, { session: false }, (err) => {
          if (err) {
            // TODO: Throw error here
            response.send(err)
          } else {
            // TODO: create token here
            const token = this.authenticationService.createToken(user)
            response.json({ user, token })
          }
        })
      }
    })(request, response)
  }

  // @desc Logout a user
  // @route POST /api/logout
  // @access public
  private loggingOut: RequestHandler = (request, response) => {
    request.logout(function (err) {
      if (err) {
        response.send(err)
      } else {
        response.status(200).json({
          message: 'Logout successful'
        })
      }
    })
  }
}

export default AuthenticationController
