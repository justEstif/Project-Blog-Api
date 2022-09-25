import { useLocation } from 'react-router-dom'

const EditPage = () => {
  const postID = useLocation().state

  return (
    <div>
      <div>This is the edit page: {postID}</div>
    </div>
  )
}

export default EditPage
