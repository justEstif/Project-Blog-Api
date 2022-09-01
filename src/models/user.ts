import { Schema, model } from 'mongoose'

interface IUser {
  email: string
  username: string
  password: string
  owner: boolean
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  owner: { type: Boolean, default: false }
})

// TODO: pre save function for hashing password
// TODO: Virtuals

const User = model<IUser>('User', UserSchema)
export { IUser }
export default User
