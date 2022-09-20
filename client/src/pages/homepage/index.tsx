import { useEffect, useState } from 'react'
import IPost from '../../interface/IPost'
import Header from './Header'
import Post from './Post'
import { nanoid } from 'nanoid'
import { getPosts } from '../../services/api'
import useStore from '../../store'

interface Props {}

const HomePage = ({}: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]) // TODO: add interface
  const store = useStore((state) => state)

  useEffect(() => {
    const fetchData = async () => {
      const token = store.user?.token.token || ''
      try {
        const data = await getPosts(token)
        setPosts(() => data)
      } catch (error) {
        // TODO: Better error handling
        console.log(error)
      }
    }
    fetchData()
  }, [])

  // TODO: Add a posts container and style the page
  return (
    <section>
      <Header />
      {posts.length === 0 ? (
        <p>loading</p>
      ) : (
        posts.map((post) => <Post key={nanoid()} post={post} />)
      )}
    </section>
  )
}

export default HomePage
