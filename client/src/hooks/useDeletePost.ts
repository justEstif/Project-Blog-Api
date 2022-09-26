import { useEffect, useState } from 'react'
import { deletePost } from '../services/api.owner'

const useDeletePost = () => {
  const [deleteData, setDeleteData] = useState({
    postId: '',
    token: ''
  })

  useEffect(() => {
    const handlePost = async () => {
      try {
        await deletePost({ postId: deleteData.postId, token: deleteData.token })
      } catch (error) {
        console.log(error)
      }
    }
    deleteData.postId.length !== 0 &&
      deleteData.token.length !== 0 &&
      handlePost()
  }, [deleteData.postId])

  return { setDeleteData }
}

export default useDeletePost
