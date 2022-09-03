import { Request, Response, Router } from 'express'
import { Types } from 'mongoose'
import IPost from './post.interface'
import IController from '../interface/controller.interface'

class PostController implements IController {
  public path = '/api/posts'
  public router = Router()

  private posts: IPost[] = [
    {
      title:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
      body: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
      summary:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
      tags: ['tag', 'tag2'],
      published: true,
      publicationDate: new Date(),
      commentIds: [new Types.ObjectId()]
    }
  ]

  constructor() {
    this.intializeRoutes()
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts)
    this.router.post(this.path, this.createAPost)
  }

  private getAllPosts = (_: Request, response: Response) => {
    response.send(this.posts)
  }

  private createAPost = (request: Request, response: Response) => {
    const post: IPost = request.body
    this.posts.push(post)
    response.send(post)
  }
}

export default PostController
