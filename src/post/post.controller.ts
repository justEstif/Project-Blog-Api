import { NextFunction, Request, Response, Router } from 'express'
import IPost from './post.interface'
import IController from '../interface/controller.interface'
import PostModel from './post.model'
import { Types } from 'mongoose'
import HttpException from '../exception/HttpException'
import PostNotFoundException from '../exception/PostNotFoundException'
import validationMiddleware from '../middleware/validation.middleware'
import CreatePostDto from './post.dto'
import authMiddleware from 'src/middleware/auth.middleware'

class PostController implements IController {
  public path = '/api/posts'
  public path_all = `${this.path}/*`
  public path_id = `${this.path}/:id`
  public router = Router()
  public postModel = PostModel

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getPosts)
    this.router.get(this.path_id, this.getPostById)
    this.router.post(
      this.path,
      validationMiddleware(CreatePostDto),
      this.createPost
    )
    this.router.put(
      this.path_id,
      validationMiddleware(CreatePostDto),
      this.updatePost
    )
    this.router.delete(this.path_id, this.deletePost)

    this.router
      .all(this.path_all, authMiddleware)
      .put(this.path_id, validationMiddleware(CreatePostDto), this.updatePost)
      .delete(this.path_id, this.deletePost)
      .post(
        this.path,
        authMiddleware,
        validationMiddleware(CreatePostDto),
        this.createPost
      )
  }

  // @desc Return posts in desc order by publication_date
  // @route GET /api/posts
  // @access Public
  private getPosts(_: Request, response: Response, next: NextFunction) {
    this.postModel
      .find()
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

  // @desc Return post from the id
  // @route GET /api/posts:id
  // @access Public
  private getPostById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = new Types.ObjectId(request.params.id)
    this.postModel.findById(id).exec((error, post) => {
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

  // @desc Set a post
  // @route POST /api/posts
  // @access Private
  private createPost(request: Request, response: Response, next: NextFunction) {
    const postData: IPost = request.body
    this.postModel.create(postData, (error, post) => {
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

  // @desc Update a post
  // @route PUT /api/posts/:id
  // @access Private
  private updatePost(request: Request, response: Response, next: NextFunction) {
    const id = new Types.ObjectId(request.params.id)
    const post: IPost = request.body
    this.postModel.findByIdAndUpdate(id, post, { new: true }).exec((error) => {
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

  // @desc Delete a post
  // @route DELETE /api/posts/:id
  // @access Private
  private deletePost(request: Request, response: Response, next: NextFunction) {
    const id = new Types.ObjectId(request.params.id)
    this.postModel.findByIdAndRemove(id).exec((error) => {
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
