import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'
import Form from './Form'

const EditPage = () => {
  const postID = useLocation().state
  const { post } = useGetPost(postID)

  return (
    <div>
      <div>This is the edit page: {postID}</div>
      {!post ? <p>Loading</p> : <Form post={post} />}
    </div>
  )
}

export default EditPage
