import express, { Application, json, urlencoded } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import { connect } from 'mongoose'
import validateEnv from './utils/validateEnv'
import IController from './interface/controller.interface'
import errorMiddleware from './middleware/error.middleware'

class App {
  public app: Application
  public port: number

  constructor(controllers: IController[]) {
    this.app = express()
    this.port = validateEnv.PORT
    this.connectToDB()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(json()) // body parser
    this.app.use(urlencoded({ extended: false }))
    this.app.use(compression()) // compress
    this.app.use(helmet()) // helmet
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private async connectToDB() {
    try {
      await connect(
        `mongodb+srv://${validateEnv.MONGO_USER}:${validateEnv.MONGO_PASSWORD}${validateEnv.MONGO_PATH}`
      )
      console.log(`MongoDB Connected`)
    } catch (err) {
      console.log(`MongoDB error: ${err}`)
      process.exit(1)
    }
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
