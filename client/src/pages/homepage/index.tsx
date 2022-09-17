// TODO: Add login, logout, register buttons
import IPost from '../../interface/IPost'
import Header from './Header'
import Post from './Post'
import { nanoid } from 'nanoid'

interface Props {
  postsProp: IPost[]
}

const HomePage = ({ postsProp }: Props) => {
  const posts =
    postsProp.length === 0 ? (
      <p>loading</p>
    ) : (
      postsProp.map((post) => <Post key={nanoid()} post={post} />)
    )
  return (
    <section>
      <Header />
      {posts}
    </section>
  )
}

export default HomePage
