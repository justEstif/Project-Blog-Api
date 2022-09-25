import { useForm } from 'react-hook-form'
import IPost from '../../interface/IPost'
import { useLocation } from 'react-router-dom'
import useGetPost from '../../hooks/useGetPost'

const EditPage = () => {
  const postID = useLocation().state
  const { register, handleSubmit } = useForm<IPost>()
  const onSubmit = handleSubmit((data) => console.log(data))
  const { post } = useGetPost(postID)

  return (
    <div>
      <div>This is the edit page: {postID}</div>
      {!post ? (
        <p>Loading</p>
      ) : (
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={post?.title}
            {...register('title')}
          />
          <label htmlFor="body">Body:</label>
          <input
            type="text"
            id="title"
            value={post?.body}
            {...register('body')}
          />
          <label htmlFor="summary">Summary:</label>
          <input
            type="text"
            id="title"
            value={post?.summary}
            {...register('summary')}
          />
          <label htmlFor="published">Publish:</label>
          <input
            type="checkbox"
            id="published"
            // NOTE this isn't working properly
            value={post?.published.toString()}
            {...register('published')}
          />
        </form>
      )}
      {/* FIXME {post?.tags} */}
    </div>
  )
}

export default EditPage
