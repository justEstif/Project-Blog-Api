import { useState, useEffect } from "react"
import ICreatePostProp from "../../interface/ICreatePostProp"
import { createPost } from "../../services/api.owner"

const useCreatePost = () => {
  const initialPost = {
    title: '',
    body: '',
    summary: '',
    tags: '',
    published: false,
    token: ''
  }
  const [post, setPost] = useState<ICreatePostProp>(initialPost)

  useEffect(() => {
    const handleCreate = async () => {
      try {
        await createPost(post)
        setPost(initialPost)
      } catch (error) {
        throw error
      }
    }
    !Object.is(initialPost, post) && handleCreate()
  }, [post])
  return { setPost }
}

export default useCreatePost
