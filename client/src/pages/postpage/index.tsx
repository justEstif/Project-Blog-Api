import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'
import tw from 'tailwind-styled-components'
import Comments from './Comments'
import Header from './Header'
import useGetComments from '../../hooks/useGetComments'
import { useForm } from 'react-hook-form'
import IComment from '../../interface/IComment'
import useComment from '../../hooks/useComment'
import Form from './Form'
import { useEffect } from 'react'

const PostPage = () => {
  const postID = useLocation().state
  const { post } = useGetPost(postID)
  const { comments } = useGetComments(postID)
  const { body, setBody } = useComment()

  const SBody = tw.section`
    [&>*]:py-5
    mx-auto
  `

  return (
    <>
      <Header post={post} />
      <SBody>
        <div className="border-b-2">{post?.body}</div>
        <Comments Form={<Form setBody={setBody} />} postComments={comments} />
      </SBody>
    </>
  )
}

export default PostPage
