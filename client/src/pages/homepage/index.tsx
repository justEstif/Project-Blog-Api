import { useEffect, useState } from 'react'
import axios from 'axios'
import IPost from '../../interface/IPost'
import Header from './Header'
import Post from './Post'
import { nanoid } from 'nanoid'

interface Props {}

const HomePage = ({}: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]) // TODO: add interface
  const urlwithProxy = '/api/posts'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlwithProxy)
        const data: IPost[] = response.data
        setPosts(() => data)
      } catch (error) {
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
