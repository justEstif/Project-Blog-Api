import { Request, Response  } from 'express'
class HttpException extends Error {
  status: number
  message: string
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

const errrorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
) => {
  // use the req statusCode or 500 (server error)
  const statusCode = req.statusCode ? res.statusCode : 500

  res.status(statusCode) // change the statusCode

  res.json({
    // respond err msg as json
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

export default errrorHandler
