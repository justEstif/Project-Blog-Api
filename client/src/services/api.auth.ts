import axios, { AxiosError } from 'axios'
import IUserCredentials from '../interface/IUserCredentials'
import IUser from '../interface/IUser'

// TODO: Move these function or import them into zustand store
// TODO: Log in, Log out, Register

export const loginUser = async (userCredentials: IUserCredentials) => {
  interface ILoginResponse {
    message: string
    user: IUser | null
  }

  const getUrlResponse = async (userCredentials: IUserCredentials) => {
    try {
      const response = await axios.post('/api/login', { ...userCredentials })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleUrlResponse = async (): Promise<ILoginResponse> => {
    try {
      const data = await getUrlResponse(userCredentials) // NOTE: returns user, token
      // TODO:set the user here
      return {
        user: {
          ...data.user,
          ...data.token
        },
        message: 'Logged in'
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message: string = error.response?.data
        return {
          user: null,
          message
        }
      } else {
        return { user: null, message: 'Error not instanceof Axios' }
      }
    }
  }

  return await handleUrlResponse()
}
