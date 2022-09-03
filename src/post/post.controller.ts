import { NextFunction, Request, Response, Router } from 'express'
import IPost from './post.interface'
import IController from '../interface/controller.interface'
import PostModel from './post.model'
import { Types } from 'mongoose'
import HttpException from '../exceptions/HttpException'
import PostNotFoundException from '../exceptions/PostNotFoundException'
import validationMiddleware from '../middleware/validation.middleware'
import CreatePostDto from './post.dto'

class PostController implements IController {
  public path = '/api/posts'
  public path_id = '/api/posts/:id'
  public router = Router()

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getPosts)
    this.router.post(
      this.path,
      validationMiddleware(CreatePostDto),
      this.createPost
    )
    this.router.get(this.path_id, this.getPostById)
    this.router.put(
      this.path_id,
      validationMiddleware(CreatePostDto),
      this.updatePost
    )
    this.router.delete(this.path_id, this.deletePost)
  }

  private getPosts(_: Request, response: Response, next: NextFunction) {
    PostModel.find()
      .sort({ publication_date: 1 })
      .exec((error, posts) => {
        if (error) {
          next(new HttpException(404, 'Failed to get posts'))
        } else {
          response.status(200).json({
            Message: 'Posts received',
            Posts: posts
          })
        }
      })
  }

  private getPostById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = new Types.ObjectId(request.params.id)
    PostModel.findById(id).exec((error, post) => {
      if (error) {
        next(new PostNotFoundException(id))
      } else {
        response.status(200).json({
          Message: 'Post received',
          Post: post
        })
      }
    })
  }

  private createPost(request: Request, response: Response, next: NextFunction) {
    const postData: IPost = request.body
    PostModel.create(postData, (error, post) => {
      if (error) {
        next(new HttpException(404, 'Failed to create post'))
      } else {
        response.status(200).json({
          Message: 'Post saved',
          Post: post
        })
      }
    })
  }

  private updatePost(request: Request, response: Response, next: NextFunction) {
    const id = new Types.ObjectId(request.params.id)
    const post: IPost = request.body
    PostModel.findByIdAndUpdate(id, post, { new: true }).exec((error) => {
      if (error) {
        next(new PostNotFoundException(id))
      } else {
        response.status(200).json({
          Message: 'Post updated',
          Post: post
        })
      }
    })
  }

  private deletePost(request: Request, response: Response, next: NextFunction) {
    const id = new Types.ObjectId(request.params.id)
    PostModel.findByIdAndRemove(id).exec((error) => {
      if (error) {
        next(new PostNotFoundException(id))
      } else {
        response.status(200).json({
          Message: 'Post deleted',
          Post: id
        })
      }
    })
  }
}

export default PostController
