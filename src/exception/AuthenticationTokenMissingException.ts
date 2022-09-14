import HttpException from './HttpException'

// NOTE: THIS ISN'T USED ANYWHERE
class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, 'Authentication token missing')
  }
}

export default AuthenticationTokenMissingException
