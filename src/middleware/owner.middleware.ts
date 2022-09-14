import { RequestHandler } from 'express'
import authMiddleware from './auth.middleware'
import NotOwnerException from '../exception/NotOwnerException'

// Unnecessary anymore
// Only owner is allowed on this route
const ownerMiddleware: RequestHandler = (request, response, next) => {
  authMiddleware(request, response, () => {
    if (request.user.owner) {
      next()
    } else {
      next(new NotOwnerException())
    }
  })
}

export default ownerMiddleware
