import { nanoid } from 'nanoid'
import SHeader from '../../components/SHeader'
import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'

const PostPage = () => {
  const postID = useLocation().state
  const { post, comment } = useGetPost(postID)
  const postPubDate = post?.publicationDate?.toString() ?? 'Not Published'
  const tags = post?.tags.map((tag) => (
    <p key={nanoid()} className="text-red-700 text-md">
      #{tag}{' '}
    </p>
  ))


  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">{post?.title}</p>
        <p className="uppercase text-md">{postPubDate}</p>
        {tags}
      </SHeader>
      <div className="py-5 mx-auto max-w-sm border-b-2">{post?.body}</div>

      {/* TODO: Add comments and comment form below the body*/}
    </>
  )
}

export default PostPage
