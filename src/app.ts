import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import { connectDB } from './config/db'
import endpoints from './endpoints.config'

const port = endpoints.PORT || 5000

connectDB() // Connect to MongoDB

const app: express.Express = express()

app.use(compression()) // compress all paths

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
)

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'ejs')

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
