import { useForm } from 'react-hook-form'
import useStore from '../../store'
import ICreatePostProp from '../../interface/ICreatePostProp'
import tw from 'tailwind-styled-components'
import { useEffect, useState } from 'react'
import { createPost } from '../../services/api.owner'

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

const useCreatePost = () => {
  const initialPost = {
    title: '',
    body: '',
    summary: '',
    tags: '',
    published: false,
    token: ''
  }
  const [post, setPost] = useState<ICreatePostProp>(initialPost)

  useEffect(() => {
    const handleCreate = async () => {
      try {
        await createPost(post)
        setPost(initialPost)
      } catch (error) {
        throw error
      }
    }
    !Object.is(initialPost, post) && handleCreate()
  }, [post])
  return { setPost }
}

const Form = () => {
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
