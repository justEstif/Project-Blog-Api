import { Request, Response, Router } from 'express'
import IController from '../interface/controller.interface'
import IUser from './user.interface'

class UserController implements IController {
  public path = '/api/user'
  public router = Router()

  private users: IUser[] = [
    {
      email: 'test@email.com',
      username: 'test',
      password: 'test123',
      owner: false
    }
  ]

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.signInUser)
    this.router.post(this.path, this.signUpUser)
  }

  signInUser = (_: Request, response: Response) => {
    response.send(this.users)
  }

  signUpUser = (request: Request, response: Response) => {
    const user: IUser = request.body
    this.users.push(user)
    response.send(user)
  }
}

export default UserController
