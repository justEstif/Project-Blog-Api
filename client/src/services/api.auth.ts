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
      // TODO: The error needs to be handled here and the way user is added to store needs to be fixed
      throw error
    }
  }

  const handleUrlResponse = async (): Promise<ILoginResponse> => {
    try {
      const data = await getUrlResponse(userCredentials)
      return {
        user: {
          ...data.user,
          ...data.token
        },
        message: 'Logged in'
      }
    } catch (error) {
      const err = error as { response: { data: { message: string } } }
      const data = err.response?.data
      const { message } = data as { message: string }
      return {
        user: null,
        message: message ?? 'Error not instanceof Axios'
      }
    }
  }
  return await handleUrlResponse()
}
