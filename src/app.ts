import express, { Application, json, urlencoded } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import { endpoints } from './config'
import IController from './interface/controller.interface'

class App {
  public app: Application
  public port: number

  constructor(controllers: IController[]) {
    this.app = express()
    this.port = endpoints.PORT || 5000
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  private initializeMiddlewares() {
    // body parser
    this.app.use(json())
    this.app.use(urlencoded({ extended: false }))
    // compress all paths
    this.app.use(compression())
    // Secure http headers
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
      })
    )
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${this.port}`
      )
    })
  }
}

export default App
