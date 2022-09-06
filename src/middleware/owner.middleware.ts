import { RequestHandler } from 'express'
import NotOwnerException from 'src/exception/NotOwnerException'

const ownerMiddleware: RequestHandler = (req, _, next) => {
  if (req.user.owner) { // check if the req user is the owner
    next()
  } else {
    next(new NotOwnerException()) // else throw error
  }
}

export default ownerMiddleware
