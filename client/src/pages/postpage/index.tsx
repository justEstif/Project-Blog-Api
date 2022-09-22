import { nanoid } from 'nanoid'
import SHeader from '../../components/SHeader'
import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'
import getFormattedDate from '../../utils/getFormattedDate'
import tw from 'tailwind-styled-components'
import Comments from './Comments'

const PostPage = () => {
  const postID = useLocation().state
  const { post, comments } = useGetPost(postID)
  const postPubDate = post?.publicationDate?.toString() ?? 'Not Published'

  const postTags = post?.tags.map((tag) => (
    <p key={nanoid()} className="text-red-700 text-md">
      #{tag}{' '}
    </p>
  ))

  const SBody = tw.section`
    [&>*]:py-5
    mx-auto
    max-w-sm
  `

  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">{post?.title}</p>
        <p className="uppercase text-md">{postPubDate}</p>
        {postTags}
      </SHeader>

      <SBody>
        <div className="border-b-2">{post?.body}</div>
        <Comments postComments={comments}/>
      </SBody>

      {/* TODO: Add comments and comment form below the body*/}
    </>
  )
}

export default PostPage
