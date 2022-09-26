import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import useStore from '../../store'
import { useForm } from 'react-hook-form'
import useDeletePost from '../../hooks/useDeletePost'

interface IPostId {
  postid: string
}
const DeletePage = () => {
  const { handleSubmit } = useForm<IPostId>()
  const { setDeleteData } = useDeletePost()
  const postId = useLocation().state
  const navigate = useNavigate()
  const store = useStore((state) => state)
  const token = store.user?.token.token || ''
  const onSubmit = handleSubmit((_) => {
    setDeleteData({
      postId: postId,
      token: token
    })
    navigate('/owner')
  })
  return (
    <div className="flex justify-center content-center">
      <form onSubmit={onSubmit}>
        <div className="flex gap-4">
          <button type="submit" className="hover:bg-green-500">
            Confirm
          </button>
          <Link to={`/owner`}>
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default DeletePage
