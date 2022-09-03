import { Request, Response, Router } from 'express'
import IPost from './post.interface'
import IController from '../interface/controller.interface'
import PostModel from './post.model'
import { Types } from 'mongoose'

class PostController implements IController {
  public path = '/api/posts'
  public path_id = '/api/posts/:id'
  public router = Router()

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getPosts)
    this.router.post(this.path, this.createPost)
    this.router.get(this.path_id, this.getPostById)
    this.router.patch(this.path_id, this.updatePost)
    this.router.delete(this.path_id, this.deletePost)
  }

  private getPosts(_: Request, response: Response) {
    PostModel.find().then((posts) => response.send(posts))
    PostModel.find()
      .sort({ publication_date: 1 })
      .exec((error, posts) => {
        if (error) {
          response.status(400).json({
            Message: 'Failed to get posts',
            Error: error
          })
        } else {
          response.status(200).json({
            Message: 'Post updated',
            Posts: posts
          })
        }
      })
  }

  private getPostById(request: Request, response: Response) {
    // TODO: change the id to ObjectID
    const id = new Types.ObjectId(request.params.id)
    PostModel.findById(id).exec((error, post) => {
      if (error) {
        response.status(400).json({
          Message: 'Failed to get post',
          Error: error
        })
      } else {
        response.status(200).json({
          Message: 'Post updated',
          Post: post
        })
      }
    })
  }

  private createPost(request: Request, response: Response) {
    const postData: IPost = request.body
    const post = new PostModel(postData)
    post.save((error) => {
      if (error) {
        response.status(400).json({
          Message: 'Failed to save post',
          Error: error,
          Post: post
        })
      } else {
        response.status(200).json({
          Message: 'Post saved',
          Post: post
        })
      }
    })
  }

  private updatePost(request: Request, response: Response) {
    const id = new Types.ObjectId(request.params.id)
    const post: IPost = request.body
    PostModel.findByIdAndUpdate(id, post, { new: true }).exec((error) => {
      if (error) {
        response.status(400).json({
          Message: 'Failed to save post',
          Error: error,
          Post: post
        })
      } else {
        response.status(200).json({
          Message: 'Post updated',
          Post: post
        })
      }
    })
  }

  private deletePost(request: Request, response: Response) {
    const id = new Types.ObjectId(request.params.id)
    PostModel.findByIdAndRemove(id).exec((error) => {
      if (error) {
        response.status(400).json({
          Message: 'Failed to delete post',
          Error: error
        })
      } else {
        response.status(200).json({
          Message: 'Post deleted',
          ID: id
        })
      }
    })
  }
}

export default PostController
