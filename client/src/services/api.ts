import axios from 'axios'
import IPost from '../interface/IPost'

// NOTE: Name the functions same as on the backend
// TODO: Check if there is an active user
export const getPosts = async (): Promise<IPost[] | []> => {
  const urlwithProxy = '/api/posts'
  try {
    const response = await axios.get(urlwithProxy)
    const data: IPost[] = response.data
    return data
  } catch (error) {
    throw error
  }
}
