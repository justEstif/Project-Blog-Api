import { nanoid } from 'nanoid'
import SHeader from '../../components/SHeader'
import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'
import getFormattedDate from '../../utils/getFormattedDate'
import tw from 'tailwind-styled-components'

const PostPage = () => {
  const postID = useLocation().state
  const { post, comments } = useGetPost(postID)
  const postPubDate = post?.publicationDate?.toString() ?? 'Not Published'

  const postComments = comments?.map((comment) => {
    const commentDate = getFormattedDate(new Date(comment.commentDate))
    const user = comment.user || null
    // username ---- data
    // body
    return (
      <div key={nanoid()} className='my-5'>
        <div className="flex justify-start gap-6">
          <p>{user ? user.username : 'username '}</p>
          <p>{commentDate}</p>
        </div>
        <p>{comment.body}</p>
      </div>
    )
  })
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
        <div>
          <div className="text-2xl">Comments</div>
          {postComments}
        </div>
      </SBody>

      {/* TODO: Add comments and comment form below the body*/}
    </>
  )
}

export default PostPage
