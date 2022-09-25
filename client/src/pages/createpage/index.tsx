import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useCreatePost from '../../hooks/useCreatePost'
import ICreatePostProp from '../../interface/ICreatePostProp'

const CreatePage = () => {
  const { handleSubmit } = useForm<ICreatePostProp>()
  const { setPost } = useCreatePost()
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    setPost(data)
    navigate('/owner')
  })
  return (
    <div>
      <div>This is the createpage</div>
      <form onSubmit={onSubmit}>
        {/* TODO create form */}
      </form>
    </div>
  )
}

export default CreatePage
