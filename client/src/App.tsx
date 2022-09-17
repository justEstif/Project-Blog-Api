import { useEffect, useState } from 'react'
import axios from 'axios'
import HomePage from './pages/homepage'
import Layout from './components/Layout'
import IPost from './interface/IPost'
import NavBar from './components/NavBar'

function App() {
  const [posts, setPosts] = useState<IPost[]>([]) // TODO: add interface
  const urlwithProxy = '/api/posts'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlwithProxy)
        const data: IPost[] = response.data
        setPosts(() => data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <NavBar />
      <HomePage postsProp={posts} />
    </Layout>
  )
}

export default App
