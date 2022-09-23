import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useStore from '../store'
import { createComment } from '../services/api'

const useComment = () => {
  const store = useStore((state) => state)
  const token = store.user?.token.token || null
  const user = store.user?.user._id || null
  const postID = useLocation().state

  const [body, setBody] = useState('')

  useEffect(() => {
    const handleComment = async () => {
      token && user && body && (await createComment(postID, token, body, user))
    }
    handleComment()
  }, [body])

  return { setBody }
}

export default useComment
