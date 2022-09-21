import { useLocation } from 'react-router-dom'

const PostPage = () => {
  const postID = useLocation().state

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const data = await getPost(location.state)
  //       setPosts(() => data)
  //     }
  //     }
  //
  // }, [params.id])
  // TODO: call the api and get post info
  return <div>Hello from post page: </div>
}

export default PostPage
