import { Request } from 'express'
import IUser from '../user/user.interface'

interface RequestWithUser extends Request {
  user: IUser
}

export default RequestWithUser
