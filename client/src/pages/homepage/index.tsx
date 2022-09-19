import { useEffect, useState } from 'react'
import IPost from '../../interface/IPost'
import Header from './Header'
import Post from './Post'
import { nanoid } from 'nanoid'
import { getPosts } from '../../services/api'

interface Props { }

const HomePage = ({ }: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]) // TODO: add interface

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts()
        setPosts(() => data)
      } catch (error) {
        // TODO: Better error handling
        console.log(error)
      }
    }
    fetchData()
  }, [])

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
