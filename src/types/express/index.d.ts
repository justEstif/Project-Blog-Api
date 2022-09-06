import IUser from '../user/user.interface'

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: IUser
    }
  }
}
