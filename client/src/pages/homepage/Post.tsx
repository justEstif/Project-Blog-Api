import { nanoid } from 'nanoid'
import IPost from '../../interface/IPost'
import getFormattedDate from '../../utils/getFormattedDate'

interface Props {
  post: IPost
}

const Post = ({ post }: Props) => {
  const urlwithProxy = `/api/posts/${post._id}`
  return (
    <div className="flex flex-col gap-3">
      <a href={urlwithProxy}>
        <p className="text-3xl text-red-700 underline">{post.title}</p>
      </a>
      {typeof post.publicationDate === 'undefined' ? (
        <p className="italic text-blue-500">Not Yet Published</p>
      ) : (
        <p>{getFormattedDate(post.publicationDate)}</p>
      )}
      {post.tags.map((tag) => (
        <p key={nanoid()} className="text-red-700 underline text-md">
          {tag}
        </p>
      ))}
      <p>{post.summary}</p>
      <a href={urlwithProxy}>
        <p className="text-red-700 underline text-md">Read More</p>
      </a>
    </div>
  )
}

export default Post
