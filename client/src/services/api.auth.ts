import axios from 'axios'
import IUserCredentials from '../interface/IUserCredentials'
import IUser from '../interface/IUser'

// TODO: Log in, Log out, Register
// [X] Login
// [ ] Logout
// [ ] Register

interface ICustomError {
  response: { data: { message: string } }
}
export const loginUser = async (userCredentials: IUserCredentials) => {
  const getUrlResponse = async (userCredentials: IUserCredentials) => {
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
      return await getUrlResponse(userCredentials)
    } catch (error) {
      const {
        response: {
          data: { message }
        }
      } = error as ICustomError
      return message || 'Error not instanceof Axios'
    }
  }
  return await handleUrlResponse()
}

export const logoutUser = async () => {
  // @route POST /api/logout
  const getUrlResponse = async () => {
    try {
      // TODO: send the post with token
      const { data } = await axios.post('/api/logout')
      return data
    } catch (error) {
      throw error
    }
  }

  const handleUrlResponse = async () => {
    try {
      return await getUrlResponse()
    } catch (error) {
      console.log(error)
      return error
    }
  }
  await handleUrlResponse()
}
