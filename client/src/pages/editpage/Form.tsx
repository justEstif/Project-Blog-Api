import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import useStore from '../../store'
import tw from 'tailwind-styled-components'
import { useEffect, useState } from 'react'
import { updatePost } from '../../services/api.owner'
import IUpdatePostProps from '../../interface/IUpdatePostProp'
import IPost from '../../interface/IPost'

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

const useUpdatePost = () => {
  const initialPost = {
    title: '',
    body: '',
    summary: '',
    tags: '',
    published: false,
    token: '',
    postId: ''
  }
  const [post, setPost] = useState<IUpdatePostProps>(initialPost)

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await updatePost(post)
      } catch (error) {
        throw error
      }
    }
    !Object.is(initialPost, post) && handleUpdate()
  }, [post])
  return { setPost }
}

interface IProps {
  post: IPost | undefined
}

const Form = ({ post }: IProps) => {
  const { register, handleSubmit } = useForm<IUpdatePostProps>({
    defaultValues: {
      body: post?.body,
      title: post?.title,
      tags: post?.tags.join(','),
      summary: post?.summary,
      published: post?.published
    }
  })
  const { setPost } = useUpdatePost()
  const token = useStore((state) => state.user?.token.token)
  const postID = useLocation().state
  const onSubmit = handleSubmit((data) => {
    if (token) {
      data.token = token
      data.postId = postID
      setPost(data)
    }
  })
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        <label htmlFor="title" className="font-mono font-bold text-gray-500">
          Title
        </label>
        <SInput
          autoComplete="off"
          id="title"
          type="text"
          placeholder="Enter title..."
          {...register('title')}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="body" className="font-mono font-bold text-gray-500">
          Body
        </label>
        <textarea id="body" placeholder="Enter body..." {...register('body')} />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="summary" className="font-mono font-bold text-gray-500">
          Summary
        </label>

        <textarea
          id="summary"
          placeholder="Enter summary ..."
          {...register('summary')}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="Tags" className="font-mono font-bold text-gray-500">
          Tags <span className="italic">(separate by comma)</span>
        </label>
        <input type="text" {...register('tags')} />
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="Tags" className="font-mono font-bold text-gray-500">
          Published
        </label>
        <input type="checkbox" {...register('published')} />
      </div>

      {/* NOTE separate tags using comma */}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
