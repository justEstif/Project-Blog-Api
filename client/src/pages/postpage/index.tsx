import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'
import tw from 'tailwind-styled-components'
import Comments from './Comments'
import Header from './Header'
import useGetComments from '../../hooks/useGetComments'

const PostPage = () => {
  const postID = useLocation().state
  const { post } = useGetPost(postID)
  const {comments} = useGetComments(postID)

  const SBody = tw.section`
    [&>*]:py-5
    mx-auto
  `

  return (
    <>
      <Header post={post} />
      <SBody>
        <div className="border-b-2">{post?.body}</div>
        <Comments postComments={comments} />
      </SBody>
    </>
  )
}

export default PostPage
