import { useEffect, useState } from 'react'
import IComment from '../interface/IComment'
import { getPost } from '../services/api'
import useStore from '../store'

const useGetComments = (postID: string) => {
  const [comments, setComments] = useState<IComment[]>()
  const store = useStore((state) => state)
  const token = store.user?.token.token || ''

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(postID, token)
        setComments(() => data.comment)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [token])

  return { comments }
}

export default useGetComments
