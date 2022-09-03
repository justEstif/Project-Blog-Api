import { Request, Response, Router } from 'express'
import IPost from './post.interface'
import IController from '../interface/controller.interface'
import PostModel from './post.model'

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
  }

  private getPostById(request: Request, response: Response) {
    // TODO: change the id to ObjectID
    const id = request.params.id
    PostModel.findById(id).then((post) => {
      response.send(post)
    })
  }

  private createPost(request: Request, response: Response) {
    const postData: IPost = request.body
    const createdPost = new PostModel(postData)
    createdPost.save().then((savedPost) => {
      response.send(savedPost)
    })
  }

  private updatePost(request: Request, response: Response) {
    const id = request.params.id
    const postData: IPost = request.body
    PostModel.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      response.send(post)
    })
  }

  private deletePost(request: Request, response: Response) {
    const id = request.params.id
    PostModel.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200)
      } else {
        response.send(404)
      }
    })
  }
}

export default PostController
