// TODO: Add login, logout, register buttons
import IPost from '../../interface/IPost'
import Header from './Header'
import getFormattedDate from '../../utils/getFormattedDate'

interface Props {
  postsProp: IPost[]
}

const HomePage = ({ postsProp }: Props) => {
  const posts =
    postsProp.length === 0 ? (
      <p>loading</p>
    ) : (
      postsProp.map((post, i) => {
        const urlwithProxy = `/api/posts/${post._id}`
        return (
          <div key={i} className="flex flex-col gap-3">
            <a href={urlwithProxy}>
              <p className="text-3xl text-red-700 underline">{post.title}</p>
            </a>
            {typeof post.publicationDate === 'undefined' ? (
              <p className='italic text-blue-500'>Not Yet Published</p>
            ) : (
              <p>{getFormattedDate(post.publicationDate)}</p>
            )}
            {post.tags.map((tag) => (
              <p className="text-red-700 underline text-md">{tag}</p>
            ))}
            <p>{post.summary}</p>
            <a href={urlwithProxy}>
              <p className="text-red-700 underline text-md">Read More</p>
            </a>
          </div>
        )
      })
    )
  return (
    <section>
      <Header />
      {posts}
    </section>
  )
}

export default HomePage
