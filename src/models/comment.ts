import { Types, Schema, model } from 'mongoose'

interface IComment {
  body: string
  comment_date: Date
  user_id: Types.ObjectId
}

const CommentSchema = new Schema<IComment>({
  body: { type: String, required: true },
  comment_date: { type: Date, default: Date.now },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

// TODO: Virtuals
const Comment = model<IComment>('Comment', CommentSchema)
export { IComment }
export default Comment
