import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import validateEnv from '../utils/validateEnv'

// Generate  JWT Token
export const generateToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, validateEnv.JWT_SECRET, {
    expiresIn: '30d'
  })
  return token
}
