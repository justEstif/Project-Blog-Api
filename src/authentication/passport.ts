import passport from 'passport'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Strategy } from 'passport-local'
import UserModel from 'src/user/user.model'
import { RequestHandler } from 'express'

const passportConfig = (() => {
  const LocalStrategy = new Strategy(async (email, password, cb) => {
    const user = await UserModel.findOne({ email: email })
    if (!user)
      return cb(null, false, { message: 'Incorrect email or password' })
    else {
      const matchingPassword = await bcrypt.compare(
        password,
        user.get('password', null, { getters: false })
      )
      if (matchingPassword) {
        return cb(null, false, { message: 'Logged in successfully' })
      } else {
        return cb(null, false, { message: 'Incorrect email or password' })
      }
    }
  })

  const usePassport = () => {
    passport.use(LocalStrategy)
  }
  // to login user
  const passportAuth: RequestHandler = (request, response) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        response.status(400).json({
          message: 'Something is not right',
          user: user
        })
      } else {
        request.login(user, { session: false }, (err) => {
          if (err) response.send(err)
          else {
            const token = jwt.sign(user, 'jwt_secret')
            response.json({ user, token })
          }
        })
      }
    })(request, response)
  }

  return {
    usePassport,
    passportAuth
  }
})()

export default passportConfig
