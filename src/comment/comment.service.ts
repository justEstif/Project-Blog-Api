import { Types } from 'mongoose'
import HttpException from '../exception/HttpException'
import CommentDto from './comment.dto'
import CommentModel from './comment.model'

class CommentService {
  // TODO: Move to comment.controller
  public createComment = async (
    commentData: CommentDto,
    userId: string,
    postId: string
  ) => {
    const user = new Types.ObjectId(userId)
    const post = new Types.ObjectId(postId)
    const newComment = {
      ...commentData,
      user,
      postId: post
    }
    const comment = await CommentModel.create(newComment)
    if (comment) {
      return comment
    } else {
      throw new HttpException(404, 'Failed to create comment')
    }
  }

  public getComments = async (postId: string) => {
    const post = new Types.ObjectId(postId)
    const comments = await CommentModel.find({ postId: post })
      .sort({ commentDate: 1 })
      .populate('user', 'username')
    if (comments) {
      return comments
    } else {
      throw new HttpException(404, 'Failed to get comments')
    }
  }
}

export default CommentService
