import { useForm } from 'react-hook-form'
import useStore from '../../store'
import ICreatePostProp from '../../interface/ICreatePostProp'
import Form from './Form'
import useCreatePost from './useCreatePost'

const CreatePage = () => {
  const { register, handleSubmit } = useForm<ICreatePostProp>()
  const { setPost } = useCreatePost()
  const token = useStore((state) => state.user?.token.token)
  const onSubmit = handleSubmit((data) => {
    if (token) {
      data.token = token
      setPost(data)
    }
  })
  return (
    <div>
      <Form onSubmit={onSubmit} register={register} />
    </div>
  )
}

export default CreatePage
