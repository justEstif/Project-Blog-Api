import { nanoid } from 'nanoid'
import SHeader from '../../components/SHeader'
import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'

const PostPage = () => {
  const postID = useLocation().state
  const post = useGetPost(postID) // the post info

  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">{post?.title}</p>
        <p className="uppercase text-md">
          {post?.publicationDate?.toString() ?? 'Not Published'}
        </p>

        <div className="capitalize text-md">
          {post?.tags.map((tag) => (
            <p key={nanoid()} className="text-red-700 text-md">
              #{tag}{' '}
            </p>
          ))}
        </div>
      </SHeader>
      <div className="py-5 mx-auto w-full max-w-sm border-b-2">
        <p>{post?.body}</p>
      </div>
      {/* TODO: Add comments and comment form below the body*/}
    </>
  )
}

export default PostPage
