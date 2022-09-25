import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useDeletePost from '../../hooks/useDeletePost'

interface IPostId {
  postid: string
}
const DeletePage = () => {
  const { handleSubmit } = useForm<IPostId>()
  const { setPostId } = useDeletePost()
  const postId = useLocation().state
  const navigate = useNavigate()
  const onSubmit = handleSubmit((_) => {
    setPostId(postId)
    navigate('/owner')
  })
  return (
    <div>
      <form onSubmit={onSubmit}>
        <button type="submit">Confirm</button>
        <button>Cancel</button>
      </form>
      <div>This is the delete page: {}</div>
    </div>
  )
}

export default DeletePage
