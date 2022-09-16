import { RequestHandler } from 'express'
import passport from 'passport'

const filterPostMiddleware: RequestHandler = (request, response, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      request.filter = false
      next()
    } else {
      if (user.owner) {
        request.filter = false
        next()
      } else {
        request.filter = true
        next()
      }
    }
  })(request, response)
}

export default filterPostMiddleware
