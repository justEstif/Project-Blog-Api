import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import validateEnv from 'src/utils/validateEnv'
import { User } from '../models'

const authHandler: RequestHandler = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      const token = req.headers.authorization.split(' ')[1]
      interface JwtPayload {
        id: string
      }
      // verify token
      const decoded = jwt.verify(token, validateEnv.JWT_SECRET) as JwtPayload
      const user = await User.findById(decoded.id).select('-password')
      if (user) {
        req.user = user
        next()
      } else {
        // TODO: This should not be the way to handle user not found
        throw new Error('User not found')
      }
    } catch (error) {
      console.log(`Auth Middleware error: ${error}`)
      res.status(401)
      throw new Error('Not authorized')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

export default authHandler
