import { RequestHandler } from 'express'
import passport from 'passport'

const authMiddleware: RequestHandler = (request, response, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      // TODO: Add error here
      response.status(400).json({
        message: 'Something is not right'
      })
    } else {
      request.user = user // access the user in this route
      next()
    }
  })(request, response)
}

export default authMiddleware
