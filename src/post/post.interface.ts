import { Types } from 'mongoose'

interface IPost {
  title: string
  body: string
  summary: string
  tags: string[]
  published: boolean
  publicationDate: Date | undefined
  commentIds: Types.ObjectId[]
}

export default IPost
