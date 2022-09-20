import Header from './Header'
import Post from './Post'
import { nanoid } from 'nanoid'
import useGetPosts from '../../hooks/useGetPosts'

interface Props {}

const HomePage = ({}: Props) => {
  const posts = useGetPosts()
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
