import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useCreatePost from '../../hooks/useCreatePost'
import ICreatePostProp from '../../interface/ICreatePostProp'

const CreatePage = () => {
  const { register, handleSubmit } = useForm<ICreatePostProp>()
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
        <input type="text" {...register('title')} />
        <textarea {...register('body')} />
        <textarea {...register('summary')} />
        <input type="text" {...register('tags')} />
        <input type="checkbox" {...register('published')} />
        {/* NOTE separate tags using comma */}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePage
