import { useEffect, useState } from 'react'
import IPost from '../interface/IPost'
import { getPosts } from '../services/api'
import useStore from '../store'

const useGetPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const store = useStore((state) => state)

  useEffect(() => {
    const fetchPosts = async () => {
      const token = store.user?.token.token || ''
      try {
        const data = await getPosts(token)
        setPosts(() => data)
      } catch (error) {
        // TODO: Better error handling
        console.log(error)
      }
    }
    fetchPosts()
  }, [])

  return posts
}

export default useGetPosts
