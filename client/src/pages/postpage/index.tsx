import SHeader from '../../components/SHeader'
import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'

const PostPage = () => {
  const postID = useLocation().state
  const post = useGetPost(postID)

  // TODO: call the api and get post info
  return (
    <>
      <SHeader>
        {typeof post === 'undefined' ? (
          <p> Loading</p>
        ) : (
          <p className="text-5xl capitalize">{post?.title}</p>
        )}
      </SHeader>
    </>
  )
}

export default PostPage
