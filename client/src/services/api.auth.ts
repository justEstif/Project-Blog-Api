import axios from 'axios'
import ILogin from '../interface/ILogin'
import IUser from '../interface/IUser'

// TODO: Log in, Log out, Register
// [X] Login
// [ ] Logout
// [ ] Register

interface ICustomError {
  response: { data: { message: string } }
}

export const loginUser = async (login: ILogin) => {
  const getUrlResponse = async (userCredentials: ILogin) => {
    try {
      const { data } = await axios.post('/api/login', { ...userCredentials })
      return data
    } catch (error) {
      // TODO: The error needs to be handled here
      // TODO: the way user is added to store needs to be fixed
      throw error
    }
  }

  const handleUrlResponse = async (): Promise<IUser | string> => {
    try {
      return await getUrlResponse(login)
    } catch (error) {
      const {
        response: {
          data: { message } // extract error message
        }
      } = error as ICustomError
      return message || 'Error not instanceof Axios'
    }
  }
  return await handleUrlResponse()
}

export const logoutUser = async (token: string) => {
  // @route POST /api/logout
  const getUrlResponse = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      // TODO: send the post with token
      const { data } = await axios.get('/api/logout', config)
      return data
    } catch (error) {
      throw error
    }
  }

  const handleUrlResponse = async () => {
    try {
      return await getUrlResponse()
    } catch (error) {
      // TODO: Better error handling
      console.log(error)
      return error
    }
  }
  await handleUrlResponse()
}
