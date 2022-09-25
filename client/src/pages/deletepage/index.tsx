import { useLocation } from 'react-router-dom'

const DeletePage = () => {
  const postID = useLocation().state
  return (
    <div>
      <div>This is the delete page: {postID}</div>
    </div>
  )
}

export default DeletePage
