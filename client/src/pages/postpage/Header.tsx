import SHeader from '../../components/SHeader'
import { nanoid } from 'nanoid'
import IPost from '../../interface/IPost'

interface IProps {
  post: IPost | undefined
}
const Header = ({ post }: IProps) => {
  const postPubDate = post?.publicationDate?.toString() ?? 'Not Published'

  const postTags = post?.tags.map((tag) => (
    <p key={nanoid()} className="text-red-700 text-md">
      #{tag}{' '}
    </p>
  ))

  return (
    <SHeader>
      <p className="text-5xl capitalize">{post?.title}</p>
      <p className="uppercase text-md">{postPubDate}</p>
      {postTags}
    </SHeader>
  )
}

export default Header
