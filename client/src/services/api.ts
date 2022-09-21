import axios from 'axios'
import IPost from '../interface/IPost'

// DONE: Check if there is an active user -> user token
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

export const getPost = async (
  postID: string,
  token: string
): Promise<IPost> => {
  interface IGetPostResponse {
    post: IPost[]
  }
  const urlwithProxy = `/api/posts/${postID}`
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(urlwithProxy, config)
    const data: IGetPostResponse = response.data
    return data.post[0]
  } catch (error) {
    throw error
  }
}
