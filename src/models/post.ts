import { Types, Schema, model } from 'mongoose'

interface IPost {
  title: string
  body: string
  summary: string
  tags: string[]
  published: boolean
  publicationDate: Date | undefined
  commentIds: Types.ObjectId[]
}

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    minlength: [3, 'The title must be at least 3 characters long.'],
    required: true
  },
  body: {
    type: String,
    minlength: [10, 'The body must be at least 10 characters long.'],
    required: true
  },
  summary: {
    type: String,
    minlength: [5, 'The summary must be at least 5 characters long.'],
    required: true
  },
  tags: {
    type: [String],
    required: true,
    validate: [
      {
        validator: (tagArray: string[]) => tagArray.length >= 0 || !tagArray,
        message: 'At least one tag must be passed.'
      },
      {
        validator: (tagArray: string[]) =>
          tagArray.every((tag) => tag.length >= 3),
        message: 'Every tag must be at least 3 characters.'
      },
      {
        validator: (tagArray: string[]) =>
          tagArray.every((tag) => typeof tag === 'string'),
        message: 'Every tag must be a valid string'
      }
    ]
  }, // at least one tag req
  published: { type: Boolean, default: false },
  publicationDate: { type: Date, default: undefined },
  commentIds: [{ type: Types.ObjectId, ref: 'User' }] // default empty
})

// Add date when published
PostSchema.pre('save', function (next) {
  const post = this
  // if published and undefined(not to overwrite it)
  if (post.published && !post.publicationDate) {
    post.publicationDate = new Date()
  }
  next()
})

// TODO: Virtuals
const Post = model<IPost>('Post', PostSchema)
export { IPost }
export default Post
