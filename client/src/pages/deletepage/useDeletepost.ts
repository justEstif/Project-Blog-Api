import { useState, useEffect } from 'react'
import { deletePost } from '../../services/api.owner'

const useDeletePost = () => {
  const initialValue = {
    postId: '',
    token: ''
  }
  const [deleteData, setDeleteData] = useState(initialValue)

  useEffect(() => {
    const handlePost = async () => {
      try {
        await deletePost({ postId: deleteData.postId, token: deleteData.token })
        setDeleteData(initialValue)
      } catch (error) {
        console.log(error)
      }
    }
    !Object.is(initialValue, deleteData) && handlePost()
  }, [deleteData.postId])

  return { setDeleteData }
}

export default useDeletePost
