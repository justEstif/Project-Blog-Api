import { useState, useEffect } from "react"
import IUpdatePostProps from "../../interface/IUpdatePostProp"
import { updatePost } from "../../services/api.owner"

const useUpdatePost = () => {
  const initialPost = {
    title: '',
    body: '',
    summary: '',
    tags: '',
    published: false,
    token: '',
    postId: ''
  }
  const [post, setPost] = useState<IUpdatePostProps>(initialPost)

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await updatePost(post)
      } catch (error) {
        throw error
      }
    }
    !Object.is(initialPost, post) && handleUpdate()
  }, [post])
  return { setPost }
}

export default useUpdatePost
