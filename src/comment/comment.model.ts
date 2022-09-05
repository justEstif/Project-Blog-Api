import IComment from './comment.interface'
import { Schema, model } from 'mongoose'

const CommentSchema = new Schema<IComment>({
  body: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

const Comment = model<IComment>('Comment', CommentSchema)
export default Comment
