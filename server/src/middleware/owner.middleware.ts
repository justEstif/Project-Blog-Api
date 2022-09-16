import { RequestHandler } from 'express'
import authMiddleware from './auth.middleware'
// import NotOwnerException from '../exception/NotOwnerException'

// Only owner is allowed on this route
const ownerMiddleware: RequestHandler = (request, response, next) => {
  authMiddleware(request, response, () => {
    if (request.user.owner) {
      next()
    } else {
      response.status(400).json({
        message: 'Not owner: Route not allowed'
      })
    }
  })
}

export default ownerMiddleware
