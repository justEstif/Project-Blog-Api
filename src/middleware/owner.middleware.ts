import { RequestHandler } from 'express'
import NotOwnerException from '../exception/NotOwnerException'

// Only owner is allowed on this route
const ownerMiddleware: RequestHandler = (req, _, next) => {
  if (req.user.owner) {
    next()
  } else {
    next(new NotOwnerException())
  }
}

export default ownerMiddleware
