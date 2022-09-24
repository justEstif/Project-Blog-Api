/**
 * TODO: create function for creating post
 * TODO: create function for updating post
 * TODO: create function for deleting post
 * */

import axios from 'axios'
import IPost from '../interface/IPost'

interface ICreatePostProp {
  title: string
  body: string
  summary: string
  tags: string[]
  published: boolean
  token: string
}

export const createPost = async ({
  title,
  body,
  summary,
  tags,
  published,
  token
}: ICreatePostProp) => {
  // NOTE The backend might have a bug that doesn't let it take a published boolean

  const apiUrl = `/api/posts/`
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const newPost: IPost = {
      published,
      title,
      tags,
      summary,
      body
    }

    const response = await axios.post(apiUrl, { ...newPost }, config)
    return response.data
  } catch (error) {
    throw error
  }
}

interface IUpdatePostProps extends ICreatePostProp{
  postId: string
}
export const updatePost = async ({
  postId,
  title,
  body,
  summary,
  tags,
  published,
  token
}: IUpdatePostProps) => {
  // NOTE The backend might have a bug that doesn't let it take a published boolean

  const apiUrl = `/api/posts/${postId}`
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const newPost: IPost = {
      published,
      title,
      tags,
      summary,
      body
    }

    const response = await axios.put(apiUrl, { ...newPost }, config)
    return response.data
  } catch (error) {
    throw error
  }
}


interface IDeletePostProps {
  token: string
  postId: string
}
export const deletePost = async ({ postId, token }: IDeletePostProps) => {
  const apiUrl = `/api/posts/${postId}`
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.delete(apiUrl, config)
    return response.data
  } catch (error) {
    throw error
  }
}
