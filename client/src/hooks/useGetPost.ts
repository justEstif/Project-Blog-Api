import { useEffect, useState } from 'react'
import IComment from '../interface/IComment'
import IPost from '../interface/IPost'
import { getPost } from '../services/api'
import useStore from '../store'

const useGetPost = (postID: string) => {
  const [post, setPost] = useState<IPost>()
  const [comment, setComment] = useState<IComment[]>()
  const store = useStore((state) => state)
  const token = store.user?.token.token || ''

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(postID, token)
        setPost(() => data.post)
        setComment(() => data.comment)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [token])

  return { post, comment }
}

export default useGetPost
