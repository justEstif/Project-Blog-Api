import { RequestHandler } from 'express'
import { isValidObjectId } from 'mongoose'
// import InValidIdException from '../exception/InValidIdException'

const checkPostIdMiddleware: RequestHandler = (request, response, next) => {
  const id = request.params.id
  if (!isValidObjectId(id)) {
    response.status(400).json({
      message: 'Invalid post id'
    })
  } else {
    next()
  }
}
export default checkPostIdMiddleware
