import passport from 'passport'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import UserModel from 'src/user/user.model'
import { RequestHandler } from 'express'

const passportConfig = (() => {
  const localStrategy = new LocalStrategy(async (email, password, cb) => {
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

  // to login user
  const loginUser: RequestHandler = (request, response) => {
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        // TODO: Throw error here
        response.status(400).json({
          message: 'Something is not right',
          user: user
        })
      } else {
        request.login(user, { session: false }, (err) => {
          if (err) {
            // TODO: Throw error here
            response.send(err)
          } else {
            // TODO: create token here
            const token = jwt.sign(user, 'jwt_secret') // Create jwt token
            response.json({ user, token })
          }
        })
      }
    })(request, response)
  }

  // for special routes
  // TODO: Figure out how you get the user info
  const authUser = new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret'
    },
    async (jwtPayload, cb) => {
      try {
        const user = await UserModel.findById(jwtPayload.id)
        return cb(null, user)
      } catch (err) {
        return cb(err)
      }
    }
  )

  const usePassport = () => {
    passport.use(localStrategy)
  }

  return {
    usePassport,
    passportAuth: loginUser,
    authUser
  }
})()

export default passportConfig
