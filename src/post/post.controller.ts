import { NextFunction, Request, Response, Router } from 'express'
import IPost from './post.interface'
import IController from '../interface/controller.interface'
import PostModel from './post.model'
import { Types } from 'mongoose'
import HttpException from '../exception/HttpException'
import PostNotFoundException from '../exception/PostNotFoundException'
import validationMiddleware from '../middleware/validation.middleware'
import CreatePostDto from './post.dto'
import authMiddleware from '../middleware/auth.middleware'
import ownerMiddleware from '../middleware/owner.middleware'
import CommentDto from '../comment/comment.dto'
import Comment from '../comment/comment.model'

class PostController implements IController {
  public path = '/api/posts'
  public path_all = `${this.path}/*`
  public path_id = `${this.path}/:id`
  public path_id_comment = `${this.path}/:id/comment`
  public router = Router()

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    // public routes
    this.router.get(this.path, this.getPosts)
    this.router.get(this.path_id, this.getPostById)
    // private routes -> only owner
    this.router
      .put(
        this.path_id,
        authMiddleware,
        ownerMiddleware,
        validationMiddleware(CreatePostDto),
        this.updatePost
      )
      .delete(this.path_id, authMiddleware, ownerMiddleware, this.deletePost)
      .post(
        this.path,
        authMiddleware,
        ownerMiddleware,
        validationMiddleware(CreatePostDto),
        this.createPost
      )
      .post(
        this.path_id_comment,
        authMiddleware,
        validationMiddleware(CommentDto),
        this.createComment
      )
  }

  // TODO: Don't get posts that aren't published if not owner
  // @desc Return posts in desc order by publication_date
  // @route GET /api/posts
  // @access Public
  private getPosts(_: Request, response: Response, next: NextFunction) {
    // if owner -> get all
    // else get published only
    PostModel.find()
      .sort({ publicationDate: 1 })
      .exec((error, posts) => {
        if (error) {
          next(new HttpException(404, 'Failed to get posts'))
        } else {
          response.status(200).json({
            message: 'Posts received',
            posts: posts
          })
        }
      })
  }

  // TODO: Don't get posts that isn't published if not owner
  // @desc Return post from the id
  // @route GET /api/posts:id
  // @access Public
  private getPostById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = new Types.ObjectId(request.params.id)
    // if post is published and user is owner show
    // else don't
    PostModel.findById(id).exec((error, post) => {
      if (error) {
        next(new PostNotFoundException(id))
      } else {
        Comment.find({ postId: id }) // TODO: Move this function somewhere else
          .sort({ commentDate: 1 })
          .populate('user', 'username') // NOTE: Get the username only
          .exec((error, comments) => {
            if (error) {
              next(new PostNotFoundException(id))
            } else {
              response.status(200).json({
                message: 'Post received',
                post: post,
                comments: comments
              })
            }
          })
      }
    })
  }

  // @desc Set a post
  // @route POST /api/posts
  // @access Private
  private createPost(request: Request, response: Response, next: NextFunction) {
    const postData: IPost = request.body
    PostModel.create(postData, (error, post) => {
      if (error) {
        next(new HttpException(404, 'Failed to create post'))
      } else {
        response.status(200).json({
          message: 'Post saved',
          post: post
        })
      }
    })
  }

  // @desc Update a post
  // @route PUT /api/posts/:id
  // @access Private
  private updatePost(request: Request, response: Response, next: NextFunction) {
    const id = new Types.ObjectId(request.params.id)
    const post: IPost = request.body
    PostModel.findByIdAndUpdate(id, post, { new: true }).exec((error) => {
      if (error) {
        next(new PostNotFoundException(id))
      } else {
        response.status(200).json({
          message: 'Post updated',
          post: post
        })
      }
    })
  }

  // @desc Delete a post
  // @route DELETE /api/posts/:id
  // @access Private
  private deletePost(request: Request, response: Response, next: NextFunction) {
    const id = new Types.ObjectId(request.params.id)
    PostModel.findByIdAndRemove(id).exec((error) => {
      if (error) {
        next(new PostNotFoundException(id))
      } else {
        response.status(200).json({
          message: 'Post deleted',
          post: id
        })
      }
    })
  }

  // @desc Create a comment
  // @route POST /api/posts/:id/comment
  // @access Private
  private createComment(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const commentData: CommentDto = request.body
    const newComment = {
      ...commentData,
      user: request.user._id, // current user id
      postId: request.params.id // current post id
    }
    Comment.create(newComment, (error, comment) => {
      if (error) {
        next(new HttpException(404, 'Failed to create comment'))
      } else {
        response.status(200).json({
          message: 'Comment saved',
          comment: comment
        })
      }
    })
  }
}

export default PostController
