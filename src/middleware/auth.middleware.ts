import jwt from 'jsonwebtoken'
import endpoints from '../utils/endpoints'
import AuthenticationTokenMissingException from '../exception/AuthenticationTokenMissingException'
import WrongAuthenticationTokenException from '../exception/WrongAuthenticationTokenMissingException'
import DataStoredInToken from '../interface/dataStoredInToken'
import asyncHander from 'express-async-handler'
import User from '../user/user.model'

// checks that a user is logged in
const authMiddleware = asyncHander(async (request, _, next) => {
  const cookies = request.cookies
  if (cookies && cookies.Authorization) {
    const secret = endpoints.JWT_SECRET

    try {
      const { _id: id } = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken
      const user = await User.findById(id)
      if (user) {
        request.user = user
        next()
      } else {
        next(new WrongAuthenticationTokenException())
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException())
    }
  } else {
    next(new AuthenticationTokenMissingException())
  }
})

export default authMiddleware
