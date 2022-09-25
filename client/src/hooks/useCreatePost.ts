import { useEffect, useState } from 'react'
import useStore from '../store'
import { createPost } from '../services/api.owner'
import ICreatePostProp from '../interface/ICreatePostProp'

const useCreatePost = () => {
  const store = useStore((state) => state)
  const owner = store.user?.user.owner
  const token = store.user?.token.token
  const [post, setPost] = useState<ICreatePostProp>({
    title: '',
    body: '',
    summary: '',
    tags: [''],
    published: false,
    token: ''
  })

  useEffect(() => {
    const handleCreate = async () => {
      if (token && owner)
        try {
          await createPost(post)
        } catch (error) {
          throw error
        }
    }
    post.title.length > 0 &&
      post.body.length > 0 &&
      post.summary.length > 0 &&
      post.tags.length > 0 &&
      handleCreate()
  }, [post])

  return { setPost }
}

export default useCreatePost
