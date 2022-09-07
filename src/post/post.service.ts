import { isValidObjectId, Types } from 'mongoose'
import CommentDto from '../comment/comment.dto'
import HttpException from '../exception/HttpException'
import PostNotFoundException from '../exception/PostNotFoundException'
import IPost from './post.interface'
import PostModel from './post.model'
import CommentService from '../comment/comment.service'
import InValidIdException from '../exception/InValidIdException'

class PostService {
  public commentService = new CommentService()

  public getPosts = async (owner: boolean) => {
    const searchCriteria = owner ? [true, false] : [true]
    const posts = await PostModel.find({
      published: { $in: searchCriteria }
    }).sort({ publicationDate: 1 })

    if (posts) {
      return posts
    } else {
      throw new HttpException(404, 'Failed to get posts')
    }
  }

  public getPostByID = async (id: string, owner: boolean) => {
    const searchCriteria = owner ? [true, false] : [true]
    if (!isValidObjectId(id)) {
      throw new InValidIdException(id)
    }
    const postId = new Types.ObjectId(id)
    const post = await PostModel.find({
      _id: postId,
      published: { $in: searchCriteria }
    })
    if (post) {
      const comments = await this.commentService.getComments(id)
      return { post, comments }
    } else {
      throw new PostNotFoundException(id)
    }
  }

  public updatePost = async (id: string, postData: IPost) => {
    if (!isValidObjectId(id)) {
      throw new InValidIdException(id)
    }
    const postId = new Types.ObjectId(id)
    const post = await PostModel.findByIdAndUpdate(postId, postData, {
      new: true
    })
    if (post) {
      return post
    } else {
      throw new PostNotFoundException(postId)
    }
  }

  public createPost = async (postData: IPost) => {
    const post = await PostModel.create(postData)
    if (post) {
      return post
    } else {
      throw new HttpException(404, 'Failed to create post')
    }
  }

  public deletePost = async (id: string) => {
    if (!isValidObjectId(id)) {
      throw new InValidIdException(id)
    }
    const postId = new Types.ObjectId(id)
    const post = await PostModel.findByIdAndRemove(postId)

    if (post) {
      return postId
    } else {
      throw new PostNotFoundException(postId)
    }
  }

  // TODO: Move to comment.controller
  public createComment = async (
    commentData: CommentDto,
    userId: string,
    postId: string
  ) => {
    const comment = await this.commentService.createComment(
      commentData,
      userId,
      postId
    )
    if (comment) {
      return comment
    } else {
      throw new HttpException(404, 'Failed to create comment')
    }
  }
}

export default PostService
