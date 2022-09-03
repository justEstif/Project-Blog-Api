import { Types, Schema, model } from 'mongoose'

interface IComment {
  body: string
  commentDate: Date
  userId: Types.ObjectId
}

const CommentSchema = new Schema<IComment>({
  body: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

// TODO: Virtuals
const Comment = model<IComment>('Comment', CommentSchema)
export { IComment }
export default Comment
