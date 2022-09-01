import { Schema, model } from 'mongoose'
import bcryptjs from 'bcryptjs'

interface IUser {
  email: string
  username: string
  password: string
  owner: boolean
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  username: {
    type: String,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long.'],
    required: true
  },
  password: { type: String, required: true },
  owner: { type: Boolean, default: false }
})

// Hash password when registering
UserSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password') || user.isNew) {
    if (user.password === undefined) return next()
    bcryptjs.genSalt(10, (err, salt) => {
      if (err) console.log(err)
      else {
        bcryptjs.hash(user.password, salt, function (err, hash) {
          if (err) console.log(err)
          else {
            user.password = hash
            next()
          }
        })
      }
    })
  } else return next()
})

UserSchema.methods.comparePassword = function (
  password: string,
  cb: (arg1: null | Error, arg2?: boolean) => void
) {
  bcryptjs.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return cb(error)
    } else {
      cb(null, isMatch)
    }
  })
}
// TODO: Virtuals

const User = model<IUser>('User', UserSchema)
export { IUser }
export default User
