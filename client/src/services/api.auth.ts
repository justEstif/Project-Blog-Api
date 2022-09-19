import axios from 'axios'
import IUserCredentials from '../interface/IUserCredentials'

interface IAuthUser {
  token: {
    token: string
    expiresIn: number
  }
  user: {
    id: string
    email: string
    owner: boolean
    username: string
  }
}

export const loggingIn = async ({ email, password }: IUserCredentials) => {
  const urlwithProxy = '/api/login'
  try {
    const response = await axios.post(urlwithProxy, {
      email,
      password
    })
    const data: IAuthUser = response.data
    // TODO: useStore(setAuthUser(data))
    return data
  } catch (error) {
    throw error
  }
}
