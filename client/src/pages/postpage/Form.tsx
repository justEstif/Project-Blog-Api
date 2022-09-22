import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import IComment from '../../interface/IComment'
import useStore from '../../store'
import { Dispatch, SetStateAction } from 'react'
import tw from 'tailwind-styled-components'

interface IProps {
  setComment: Dispatch<SetStateAction<IComment>>
}

const SInput = tw.input`
    max-w-xs
    appearance-none
    bg-gray-200
    border-2
    border-gray-200
    rounded
    py-2
    px-4
    text-gray-700
    leading-tight
    focus:outline-none
    focus:bg-white
    focus:border-purple-500
  `

const Form = ({setComment}:IProps) => {
  const { register, handleSubmit } = useForm<IComment>()
  const store = useStore((state) => state)
  const userId = store.user?.user._id || null
  const postId = useLocation().state

  const onSubmit = handleSubmit((data) => {
    if (userId) {
      const commentData: IComment = {
        postId,
        body: data.body,
        user: userId
      }
      setComment(commentData)
    } else {
      return // NOTE: don't allow form submit if not logged in
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <SInput
        autoComplete="off"
        id="text"
        type="text"
        placeholder="Enter comment..."
        {...register('body')}
      />
    </form>
  )
}

export default Form
