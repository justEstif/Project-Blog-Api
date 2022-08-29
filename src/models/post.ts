import { Types, Schema, model } from 'mongoose'

interface IPost {
  title: string
  body: string
  summary: string
  tags: string[]
  published: boolean
  publication_date: Date | undefined
  comment_ids: Types.ObjectId[]
}

const PostSchema = new Schema<IPost>({
  title: { type: String, minlength: 3, required: true },
  body: { type: String, minlength: 10, required: true },
  summary: { type: String, minlength: 5, required: true },
  tags: [{ type: String, required: true, minlength: 3 }], // at least one tag req
  published: { type: Boolean, default: false },
  publication_date: { type: Date, default: undefined },
  comment_ids: [{ type: Schema.Types.ObjectId, ref: 'User' }] // default empty
})

// Add date when published
PostSchema.pre('save', function (next) {
  const post = this
  // if published and undefined(not to overwrite it)
  if (post.published && !post.publication_date) {
    post.publication_date = new Date()
  }
  next()
})

// TODO: Virtuals
const Post = model<IPost>('Comment', PostSchema)
export { IPost }
export default Post
