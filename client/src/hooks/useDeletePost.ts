import { useEffect, useState } from 'react'
import useStore from '../store'
import { deletePost } from '../services/api.owner'

const useDeletePost = () => {
  const [postId, setPostId] = useState("")
  const store = useStore((state) => state)
  const owner = store.user?.user.owner
  const token = store.user?.token.token

  useEffect(() => {
    const handlePost = async () => {
      if(token && owner)
      try {
        await deletePost({ postId, token })
      } catch (error) {
        throw error
      }
    }
    postId.length && handlePost()
  }, [postId])

  return { setPostId }
}

export default useDeletePost
