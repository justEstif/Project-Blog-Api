import { Types } from 'mongoose'
import HttpException from './HttpException'

class PostNotFoundException extends HttpException {
  constructor(id: Types.ObjectId) {
    super(404, `Post with id ${id} not found`)
  }
}

export default PostNotFoundException
