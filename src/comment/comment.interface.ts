import { Types } from 'mongoose'

interface IComment {
  body: string
  commentDate: Date
  userId: Types.ObjectId
}

export default IComment
