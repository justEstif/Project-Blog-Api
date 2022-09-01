import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../models/'

const passportLocalStrategy = () => {
  const localStrategy = new Strategy(
    { usernameField: 'email' },
    (username, password, done) => {
      User.findOne({ email: username }).exec((err, user) => {
        if (err) {
          return done(err)
        } else if (!user) {
          return done(null, false, { message: 'Incorrect username' })
        } else {
          user.comparePassword(password, function (matchError, isMatch) {
            if (matchError) {
              return done(matchError)
            } else if (!isMatch) {
              return done(null, false, { message: 'Incorrect password' })
            } else {
              return done(null, user)
            }
          })
        }
      })
    }
  )
  passport.use(localStrategy)
}

export { passportLocalStrategy }
