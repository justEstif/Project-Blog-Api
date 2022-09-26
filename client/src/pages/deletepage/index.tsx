import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import useStore from '../../store'
import { useForm } from 'react-hook-form'
import SHeader from '../../components/SHeader'
import useGetPost from '../../hooks/useGetPost'
import { useState, useEffect } from 'react'
import { deletePost } from '../../services/api.owner'

interface IPostId {
  postid: string
}

const useDeletePost = () => {
  const initialValue = {
    postId: '',
    token: ''
  }
  const [deleteData, setDeleteData] = useState(initialValue)

  useEffect(() => {
    const handlePost = async () => {
      try {
        await deletePost({ postId: deleteData.postId, token: deleteData.token })
      } catch (error) {
        console.log(error)
      }
    }
    !Object.is(initialValue, deleteData) && handlePost()
  }, [deleteData.postId])

  return { setDeleteData }
}

const DeletePage = () => {
  const { handleSubmit } = useForm<IPostId>()
  const { setDeleteData } = useDeletePost()
  const postId = useLocation().state
  const { post } = useGetPost(postId)
  const store = useStore((state) => state)
  const token = store.user?.token.token || null
  const onSubmit = handleSubmit((_) => {
    if (token) {
      setDeleteData({
        postId: postId,
        token: token
      })
    }
  })
  return (
    <>
      <SHeader>
        <p className="text-5xl capitalize">Delete Post</p>
        <p className="text-3xl text-slate-700">Title: {post?.title}</p>
      </SHeader>

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
    </>
  )
}

export default DeletePage
