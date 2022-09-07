import { Types } from 'mongoose'
import CommentDto from '../comment/comment.dto'
import CommentModel from '../comment/comment.model'
import HttpException from '../exception/HttpException'
import PostNotFoundException from '../exception/PostNotFoundException'
import IPost from './post.interface'
import PostModel from './post.model'

class PostService {
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
    const postId = new Types.ObjectId(id)
    const searchCriteria = owner ? [true, false] : [true]

    const post = await PostModel.find({
      _id: postId,
      published: { $in: searchCriteria }
    })

    if (post) {
      const comments = this.getComments(id)
      return { post, comments }
    } else {
      throw new PostNotFoundException(postId)
    }
  }

  public updatePost = async (id: string, postData: IPost) => {
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

export default PostService
