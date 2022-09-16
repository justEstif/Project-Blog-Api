import { useEffect, useState } from 'react'
import axios from 'axios'
import HomePage from './pages/homepage'
import Layout from './components/layout'

interface IPost {
  title: string
  body: string
  _id: string
}

function App() {
  const [data, setData] = useState<IPost[]>([]) // TODO: add interface
  const urlwithProxy = '/api/posts'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlwithProxy)
        const data: IPost[] = response.data
        setData(() => data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

export default App
