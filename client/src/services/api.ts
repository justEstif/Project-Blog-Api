import axios from 'axios'
import IPost from '../interface/IPost'

// NOTE: Name the functions same as on the backend
// TODO: Check if there is an active user
export const getPosts = async (token: string): Promise<IPost[] | []> => {
  const urlwithProxy = '/api/posts'
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(urlwithProxy, config)
    const data: IPost[] = response.data
    return data
  } catch (error) {
    throw error
  }
}
