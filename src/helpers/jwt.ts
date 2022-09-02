import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { endpoints } from '../config'

// Generate  JWT Token
export const generateToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, endpoints.JWT_SECRET, {
    expiresIn: '30d'
  })
  return token
}
