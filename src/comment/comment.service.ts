import { isValidObjectId, Types } from 'mongoose'
import InValidIdException from '../exception/InValidIdException'
import CommentDto from './comment.dto'
import CommentModel from './comment.model'

class CommentService {
  public createComment = async (
    commentData: CommentDto,
    userId: string,
    postId: string
  ) => {
    if (!isValidObjectId(userId)) {
      throw new InValidIdException(userId)
    }

    if (!isValidObjectId(postId)) {
      throw new InValidIdException(postId)
    }
    const user = new Types.ObjectId(userId)
    const post = new Types.ObjectId(postId)
    const newComment = {
      ...commentData,
      user,
      postId: post
    }
    const comment = await CommentModel.create(newComment)
    return comment
  }

  public getComments = async (postId: string) => {
    if (!isValidObjectId(postId)) {
      throw new InValidIdException(postId)
    }

    const post = new Types.ObjectId(postId)
    const comments = await CommentModel.find({ postId: post })
      .sort({ commentDate: 1 }) // sort comments by data
      .populate('user', 'username') // only get the username
    return comments
  }
}

export default CommentService
