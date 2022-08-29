import { Schema, model } from 'mongoose'

interface IUser {
  email: string
  username: string
  hashedPassword: string
  owner: boolean
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  owner: { type: Boolean, default: false }
})

// TODO: Virtuals

const User = model<IUser>('User', UserSchema)
export { IUser }
export default User
